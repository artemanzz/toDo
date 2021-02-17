let months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

let users = [];

for (let key in localStorage) {
  if (key === 'users')
    users = JSON.parse(localStorage[key]);
}

const getDate = function () {
  let date = new Date();
  let dateData = {
    day: String(date.getDate()),
    month: months[date.getMonth()],
    year: String(date.getFullYear()),
    hours: String(date.getHours()),
    minutes: String(date.getMinutes()),
    seconds: String(date.getSeconds()),
    dateDataTransform: function () {
      if (dateData.hours.length === 1) {
        dateData.hours = '0' + dateData.hours;
      }

      if (dateData.minutes.length === 1) {
        dateData.minutes = '0' + dateData.minutes;
      }

      if (dateData.seconds.length === 1) {
        dateData.seconds = '0' + dateData.seconds;
      }
    }
  }
  dateData.dateDataTransform();
  return dateData;
}

const setLocalStorage = function (data) {
  localStorage.users = JSON.stringify(data);
}

let readUserData = function () {
  let userData = {
    name: '',
    surname: '',
    login: '',
    pass: '',
    regDate: ''
  };

  let userName = prompt('Введите через пробел имя и фамилию пользователя');
  if (userName !== null) {
    userName = userName.trim();
    userName = userName.split(' ');

    if (userName.length === 2) {
      userData.name = userName[0];
      userData.surname = userName[1];

      let login = prompt('Введите логин');

      if (login === null) {
        return;
      }

      if (login !== '') {
        userData.login = login;

        let pass = prompt('Введите пароль');
        if (pass === null) {
          return;
        }

        if (pass !== '') {
          userData.pass = pass;

          let dateData = getDate();

          userData.regDate = dateData.day + ' ' + dateData.month + ' ' +
            dateData.year + ' г., ' + dateData.hours + ':' + dateData.minutes + ':' + dateData.seconds;

          users.push(userData);
          setLocalStorage(users);

          render(users);
        } else {
          alert('Некорректно указан пароль.');
        }
      } else {
        alert('Некорректно указан логин.')
      }
    } else {
      alert('Некорректно указаны данные пользователя.');
    }
  }
}

const render = function (users) {
  let list = document.querySelector('#list');
  list.textContent = '';
  users.forEach(function (item) {
    const li = document.createElement('li');
    li.classList.add('user-item');
    li.innerHTML = '<span class="user-item-text">' + item.name + ' ' + item.surname + ', ' + item.regDate +
      '</span>' +
      '<button class="delete-btn">Удалить</button>';
    list.append(li);

    const btnDelete = li.querySelector('.delete-btn');

    btnDelete.addEventListener('click', function () {
      users.splice(users.indexOf(item), 1);
      render(users);
      setLocalStorage(users);
    });
  });
}

let signIn = function () {
  let user = '',
    checkLogin = false,
    checkPass = false;
  let login = prompt('Введите логин.');

  if (login === null) {
    return;
  }

  if (login !== '') {
    let pass = prompt('Введите пароль.');

    if (pass === null) {
      return;
    }

    if (pass !== '') {
      for (let i in users) {
        if (login === users[i].login) {
          checkLogin = true;
          if (pass === users[i].pass) {
            checkPass = true;
            user = users[i].name;
          }
        }
      }

      if (checkLogin && checkPass) {
        usernameSpan.textContent = user;
      } else {
        alert('Пользователь не найден');
      }
    } else {
      alert('Некорректно указан пароль.');
      return;
    }
  } else {
    alert('Некорректно указан логин.')
    return;
  }
};

document.querySelector('#registerUser').addEventListener('click', readUserData);
render(users);

let usernameSpan = document.querySelector('#username');
let loginBtn = document.querySelector('#login');
loginBtn.addEventListener('click', signIn);