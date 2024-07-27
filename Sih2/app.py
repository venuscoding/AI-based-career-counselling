from flask import Flask, request, jsonify, render_template
from bardapi import Bard, BardCookies

app = Flask(__name__)

cookie_dict = {
    "__Secure-1PSID": "bQj36pXT_1sb-YG9njtW6BiZNsKh0SIPnsjIqb7Px_Fy8-KevoI5ukroNOXW6Qm5IbDC4g.",
    "__Secure-1PSIDTS": "sidts-CjIB3e41ha1toF105fL7dUCjigvJXrQyesRRfxbZkH6Azu2od0BYyDvEtIkecjyaN4W4LBAA",
    # Any cookie values you want to pass to the session object.
}

bard = BardCookies(cookie_dict=cookie_dict)

@app.route("/")
def welcome():
    return render_template("hello.html")

@app.route('/api/search', methods=['POST'])
def search_bard():
    search_query = request.json.get('search_query')
    response = bard.get_answer(search_query)

    # Extract the 'content' field from the response
    answer_text = response.get('content', 'No answer available')

    # Return the 'content' field as JSON
    return jsonify({"answer": answer_text})
# ... (the rest of your Flask app)

if __name__ == '__main__':
    app.run(debug=True)
