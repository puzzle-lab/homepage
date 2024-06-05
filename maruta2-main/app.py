from flask import Flask, request, render_template, url_for, redirect, jsonify 
from flask_mysqldb import MySQL
import pymysql, hashlib, os
import pymysql.cursors

from route.login import login_blueprint

app = Flask(__name__)

app.config.update(
    DEBUG = True)


db = pymysql.connect(
   host="localhost",
    user="root",
   password="123",
    database="information", 
    charset="utf8")
cursor = db.cursor(pymysql.cursors.DictCursor)
# upload_folder = '/home/ubuntu/homepage/maruta2-main/static/image'
upload_folder = '/home/dev/Desktop/homepage/maruta2-main/static/image'
app.config['upload_folder'] = upload_folder
allowed = {'png', 'jpg', 'jpeg', 'gif'}
app.jinja_env.globals['url_for'] = url_for

def select(column):
    return f"""
    SELECT id, title, `table`
    FROM
    (
        SELECT id, title, `table`, {column}
        FROM game
        UNION
        SELECT id, title, `table`, {column}
        FROM japan
        UNION 
        SELECT id, title, `table`, {column}
        FROM music
        UNION
        SELECT id, title, `table`, {column}
        FROM computer
        UNION
        SELECT id, title, `table`, {column}
        FROM talk
    )
    AS combined_table
    ORDER BY CAST({column} AS SIGNED) DESC
    LIMIT 6;
    """
    


@app.route('/')
def index():
    return render_template('index.html')




# login
@app.route('/login', methods=["POST"])
def login():
    if request.method == 'POST':
        cursor.execute('USE information')
        result_json = request.get_json()
        classnumber = result_json['classnumber']
        password = result_json['password']
        cursor.execute("SELECT classnumber,username, password FROM user WHERE classnumber=%s;", (classnumber))
        result = cursor.fetchone()
        encoded_password = hashlib.sha256(password.encode()).hexdigest()
        if result["classnumber"] == classnumber:
            if result["password"] == encoded_password:
                return jsonify(
                     username = result['username'],
                    ok = True)
            else:
                return jsonify(
                    result_id = "ok", result="fail"
                )
        else:
            return jsonify(False)









# go to main
@app.route('/main')
def next_page():
    cursor.execute('USE post')
    cursor.execute(select("recommand"))
    result_recs = cursor.fetchall()
    cursor.execute(select("date"))
    result_dates = cursor.fetchall()
    return render_template('main.html', result_recs = result_recs, result_dates = result_dates)



# go to checking id page
@app.route('/find_pw')
def find_pw():
    return render_template('check_id.html')
# check id
@app.route('/check_id', methods = ["post"])
def recreate_pw():
    if request.method == 'POST':
        cursor.execute('USE information')
        result_json = request.get_json()
        classnumber = result_json['classnumber']
        username = result_json['username']
        cursor.execute("SELECT classnumber, username from user where username=%s", (username))
        result=cursor.fetchone()
        print(result)
        if result['username'] == result_json['username'] and result['classnumber'] == result_json['classnumber']:
            print("success")
            return jsonify(result ='success')
        else:
            print('fail')
            return jsonify(result ='fail')
    
        

    




# recreate password
@app.route('/pw_reselection', methods=["POST"])
def pw_reselection():
    cursor.execute('USE information')
    result_json = request.get_json()
    print(result_json)
    new_password = result_json['password']
    username = result_json['username']
    encoded_password = hashlib.sha256(new_password.encode()).hexdigest()
    cursor.execute("UPDATE user SET password=%s WHERE username=%s", (encoded_password, username))
    db.commit()
    return jsonify(result = 'Success')



#sign in page
@app.route('/sign_in')
def sign_in_page():
    return render_template('sign_in.html')


@app.route('/sign_in', methods = ['POST'])
def sign_in():
    if request.method=="POST":
        cursor.execute("USE information")
        result_json = request.get_json()
        classnumber_result = result_json['classnumber']
        username_result = result_json['username']
        password_result = result_json['password']
        print(result_json)
        cursor.execute("INSERT INTO user (classnumber, username, password) VALUES (%s, %s, SHA2(%s, 256))"
                       , (classnumber_result, username_result, password_result))
        db.commit()
        return jsonify(result = "success")
    
    else:
        return jsonify(result = "Fail")








# lists up
@app.route('/lists/<table>/<int:page>')
def list_table_page(table, page):
    cursor.execute('USE post')
    cursor.execute(f'SELECT COUNT(*) as cnt FROM `{table}`')
    total = int(cursor.fetchone()['cnt'])
    total_page = (total // 10) + 1
    offset = (page - 1) * 20
    cursor.execute(f'''
    SELECT {table}.id, {table}.title, {table}.article, {table}.nickname, {table}.date, {table}.recommand, COUNT({table}_comment.comment_id) as cnt
    FROM {table}
    LEFT JOIN {table}_comment ON {table}.id = {table}_comment.id
    GROUP BY {table}.id
    ORDER BY {table}.date DESC
    LIMIT 20 OFFSET {offset}
    ''')
    results = cursor.fetchall()
    return render_template('post_list.html', results = results, page = page, table = table, total_page = total_page )


@app.route('/lists/best/<int:page>')
def best(page):
    cursor.execute("USE post")
    offset = (page - 1) * 20
    cursor.execute(f"""
                SELECT id, title, `table`, date, nickname, recommand
                FROM
    (
        SELECT id, title, `table`, recommand, date, nickname 
        FROM game where recommand >= 5
        UNION ALL
        SELECT id, title, `table`, recommand, date, nickname
        FROM japan where recommand >= 5
        UNION  ALL
        SELECT id, title, `table`, recommand, date, nickname 
        FROM music where recommand >= 5
        UNION ALL
        SELECT id, title, `table`, recommand, date, nickname 
        FROM computer where recommand >= 5
        UNION ALL
        SELECT id, title, `table`, recommand, date, nickname
        FROM talk where recommand >= 5
    )
    AS combined_table
    ORDER BY cast(recommand as signed) DESC
    LIMIT 20 offset {offset}; 
    """
    )
    results = cursor.fetchall()
    cursor.execute("""
                SELECT COUNT(*) as cnt 
                FROM (
                    SELECT id FROM game WHERE recommand >= 5
                    UNION 
                    SELECT id FROM japan WHERE recommand >= 5
                    UNION 
                    SELECT id FROM music WHERE recommand >= 5
                    UNION 
                    SELECT id FROM computer WHERE recommand >= 5
                    UNION 
                    SELECT id FROM talk WHERE recommand >= 5
                ) AS combined   
            """)
    
    total = cursor.fetchone()
    
    int_total = int(total['cnt'])
    total_page = (int_total // 10 ) + 1
    table = []
    id = []
    print(len(results))
    print(results)
    for x in range(len(results)):
            table.append(results[x]['table'])
            print(table)
            id.append(results[x]['id'])
    return render_template('post_list2.html', results=results, page=page, table=table, total_page=total_page, id=id, length=len(results))





# in post 
@app.route('/<table>/<title>/<int:id>', methods=['get', 'post'])
def post(table, title, id):
    cursor.execute('USE post')
    cursor.execute(f'select title, article, image, nickname, recommand, date from `{table}`  WHERE id=%s', (id, ))
    result = cursor.fetchone()
    cursor.execute('''
    SELECT comment_id, nickname, date, article
    FROM {table}_comment 
    WHERE id=%s 
    ORDER BY comment_id DESC;
    '''.format(table=table), (id,))
    comment_result = cursor.fetchall()
    cursor.execute(f"SELECT COUNT(id) as cnt from {table}_comment where id=%s", (id,))
    result_count = cursor.fetchone()
    return render_template('post.html', result = result, table = table, title=title,id = id, url_for = url_for, comment_result = comment_result, result_count = result_count )




@app.route('/<table>/<title>/<int:id>/like', methods=['post'])
def like(table, title, id):
    cursor.execute("USE post")
    classnumber = request.get_json()
    result = classnumber['classnumber']
    cursor.execute(f'SELECT likeit FROM {table}_likeit WHERE classnumber={result} AND id = {id};')
    like_result = cursor.fetchone()
    cursor.execute(f"SELECT recommand from {table} where id={id};")
    recommand_result = cursor.fetchone() 
    recommand = recommand_result['recommand']
    print(recommand)
    if like_result:
        return jsonify(like = "true", recommand = recommand) 
    else :
        return jsonify(like = "false", recommand = recommand)






#create_page
@app.route('/<table>/create', methods=["GET"])
def post_create_page(table):
    return render_template('create.html', table = table)

# create post
@app.route('/create_<table>_post', methods=["POST"])
def post_create(table):
    cursor.execute("USE post")
    title = request.form.get("title")
    if title == None:
        return
    article = request.form.get("article")
    password = request.form.get("password")
    file = request.files["image"]
    nickname = request.form.get("nickname")
    if file and title and article and password:
        file_name = file.filename
        if file.filename.rsplit('.', 1)[1].lower() not in allowed:
            return 'File type allowed jpg, jpeg, png, gif', 400
        else:    
            file_path = os.path.join(app.config['upload_folder'], file_name)
            file.save(file_path)
            cursor.execute(f"INSERT INTO `{table}` (title, article, image, nickname, password, date) VALUES('{title}', '{article}', '{file_path}', '{nickname}', '{password}', NOW())")
            db.commit()
            return redirect(url_for('list_table_page', table=table, page=1))
    elif title and article and password:
        cursor.execute(f"INSERT INTO `{table}` (title, article, nickname, password, date) VALUES('{title}', '{article}', '{nickname}', '{password}', NOW())")
        db.commit()
        return redirect(url_for('list_table_page', table = table, page = 1))
    elif not title or not article or not password:
        return render_template("create.html", table = table)
    
#create comment
@app.route('/<table>/<title>/<int:id>/comment', methods=['POST'])
def comment(table, title, id):
    cursor.execute("USE post")
    nickname = request.form.get('nickname')
    password = request.form.get('password')
    article = request.form.get('article')
    cursor.execute(f"INSERT INTO {table}_comment (id, nickname, password, article, date) VALUES({id}, '{nickname}', '{password}', '{article}', NOW())")
    db.commit()
    return redirect(url_for('post', table = table, title = title, id = id))

#checking password ( comment )
@app.route('/<table>/<title>/<int:id>/<int:comment_id>/check', methods=['POST'])
def check_comment(table, title, id, comment_id):
    cursor.execute('USE post')
    request_password = request.get_json()
    password = request_password['password']
    print(request_password)
    cursor.execute(f"SELECT password from {table}_comment where password=%s and comment_id=%s;", (password, comment_id))
    password = cursor.fetchone()
    if password:
        return jsonify(result = 'true')
    else:
        return jsonify(result = 'false')


    
#delete comment
@app.route('/<table>/<title>/<int:id>/comment/delete/<int:comment_id>', methods = ['POST'])
def delete_comment(table, title, id, comment_id):
    cursor.execute('use post')
    cursor.execute(f'DELETE FROM {table}_comment WHERE comment_id=%s', (comment_id, ))
    db.commit()
    return redirect(url_for('post', table = table, title = title, id = id))


#post update page
@app.route('/<table>/<title>/<int:id>/update_page')
def post_update_page(table, title, id):
    cursor.execute('USE post')
    cursor.execute(f'SELECT title, article, image FROM `{table}` where title=%s', (title, ))
    result = cursor.fetchone()
    img = result['image'] if result else None
    print(result)
    print(img)
    return render_template('post_update.html', result = result, table = table, title = title, id=id, img = img)

#updat post 
@app.route('/<table>/<title>/<int:id>/update_page/update', methods=['POST'])
def post_update(table, title, id):
    cursor.execute('USE post')
    new_title = request.form.get('title')
    new_article = request.form.get('article')
    cursor.execute(f"UPDATE `{table}` SET title=%s, article=%s WHERE id=%s", (new_title, new_article, id))
    new_file = request.files['image']
    
    if new_file:
        file_name = new_file.filename
        if file_name.rsplit('.', 1)[1].lower() not in allowed:
            return 'File type allowed jpg, jpeg, png, gif', 400
        else:
            file_path = os.path.join(app.config['upload_folder'], file_name)
            cursor.execute(f"UPDATE `{table}` set title=%s, article=%s, image=%s WHERE id=%s", (new_title, new_article, file_path, id))
            new_file.save(file_path)    
            db.commit()
            return redirect(url_for('list_table_page', table = table, page = 1))
    
    else:
        cursor.execute(f"UPDATE `{table}` set title=%s, article=%s where id=%s", (new_title, new_article, id))
        db.commit()
        return redirect(url_for('list_table_page', table = table, page = 1))


@app.route('/<table>/<title>/<int:id>/password', methods=['post'])
def post_password(table, title, id):
        cursor.execute('USE post')
        request_password = request.get_json("password")
        cursor.execute(f'SELECT password from {table} where id=%s ', (id,))
        password = cursor.fetchone()
        if password == request_password:
            return jsonify(result = 'true')
        else:
            return jsonify(result = 'false')



#delete & deleted page
@app.route('/<table>/<title>/<int:id>/delete')
def post_delete(table, title, id):
    cursor.execute('USE post')
    cursor.execute(f"DELETE FROM `{table}_likeit` where id={id}")
    cursor.execute(f"DELETE FROM `{table}_comment` where id={id}")
    cursor.execute(f'DELETE FROM `{table}` WHERE id=%s', (id, ))
    db.commit()
    return redirect(url_for('list_table_page', table = table, page = 1))





@app.route('/<table>/<title>/<int:id>/recommand', methods=['post'])
def post_recommand(table, title, id):
    cursor.execute('USE post')
    get_json = request.get_json()
    classnumber = get_json['classnumber']


    cursor.execute(f"SELECT classnumber from {table}_likeit where classnumber={classnumber} and id={id};")
    result = cursor.fetchone()
    cursor.execute(f"SELECT recommand from {table} where id={id};")
    recommand = cursor.fetchone()
    if result == None:
        cursor.execute(f"INSERT INTO {table}_likeit (classnumber, id, likeit) VALUES ({classnumber}, {id}, {1})")
        cursor.execute(f"UPDATE `{table}` set recommand= recommand + 1 where id={id}")
        db.commit()
        return jsonify(result = "true", recommand=recommand)
    elif result:
        cursor.execute(f"DELETE FROM {table}_likeit where classnumber = {classnumber}")
        cursor.execute(f"UPDATE `{table}` set recommand = recommand - 1 where id={id}")
        db.commit()
        return jsonify(result = "false", recommand=recommand)
    





        



if __name__ == '__main__':
  app.run(host="0.0.0.0", port=8000, debug =True)

    
    
