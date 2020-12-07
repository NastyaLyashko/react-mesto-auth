class Api {
    constructor({baseUrl, headers},) {
        this.headers = headers;
        this.baseUrl = baseUrl;
    }
  
    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers
        })
          .then(res => {
            if (res.ok) {
              return res.json();
            }
      
            return Promise.reject(`Ошибка: ${res.status}`);
          })


    } 
    
    getUserData() {
        return fetch (`${this.baseUrl}/users/me`, {
            headers: this.headers
        })

        .then(res => {
            if (res.ok) {
              return res.json();
            } else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
        })

    }

    patchUserData(item) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: item.name,
                about: item.about
           })

        })
        .then(res => {
            if (res.ok) {
              return res.json();
            } else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
        })
        .then((res) => {
            return res;
        })
    }

    postCard(item) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: item.name,
                link: item.link
           })
        })   
        .then(res => {
            if (res.ok) {
              return res.json();
            }
      
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((res) => {
            return res;
        })

    }

    
    patchUserAvatar(item) {
        return fetch(`${this.baseUrl}/users/me/avatar `, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: item.avatar
           })

        })
        .then(res => {
            if (res.ok) {
              return res.json();
            } 
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    deleteCard(idCard) {
        return fetch(`${this.baseUrl}/cards/${idCard}`, {
            method: 'DELETE',
            headers: this.headers,
            body: JSON.stringify({
                _id: idCard,
           })
        })   
        .then(res => {
            if (res.ok) {
              return res.json();
            }
      
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    putLike(idCard) {
        return fetch(`${this.baseUrl}/cards/likes/${idCard}`, {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify({
                _id: idCard,
           })
        })   
        .then(res => {
            if (res.ok) {
              return res.json();
            }
      
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    deleteLike(idCard) {
        return fetch(`${this.baseUrl}/cards/likes/${idCard}`, {
            method: 'DELETE',
            headers: this.headers,
            body: JSON.stringify({
                _id: idCard,
           })
        })   
        .then(res => {
            if (res.ok) {
              return res.json();
            }
      
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

}
  
export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-17',
    headers: {
      authorization: 'eae790ac-cf24-4380-ba85-8ea4c48ccac5',
      'Content-Type': 'application/json'
    }
  })