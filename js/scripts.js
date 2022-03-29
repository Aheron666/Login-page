
function checkCookie() {
    if (document.cookie.includes('password') && document.cookie.includes('email')) {
        let cookieArray = document.cookie.split("; ")
        for (let coo of cookieArray) {
            let cookieElements = coo.split('=')
            console.log(cookieElements[0])
            if (cookieElements[0] == 'email')
                mail_input.value = cookieElements[1]

            if (cookieElements[0] == 'password')
                passRepeat_input.value = password_input.value = cookieElements[1]
        }
        submit.addEventListener("click", moveToSecondPage);
        submit.addEventListener("click", checkRegistrationForm);

    } else {
        submit.addEventListener("click", checkRegistrationForm);
    }
}

function checkCookiePageTwo() {
    let cookieArray = document.cookie.split("; ")
    for(let elem of cookieArray){       
        let mailElem = elem.split('=')
        if (mailElem[0] == 'email')
            greetings.innerText = `Hello ${mailElem[1]}! `   
    }    
    let firstPageLink = document.createElement('a')
    firstPageLink.href = './index_page1.html'
    firstPageLink.id = 'exit_link'
    firstPageLink.innerText = 'exit'
    greetings.append(firstPageLink)
    exit_link.addEventListener("click", removeCookie)
    if (document.cookie.includes('firstName') && document.cookie.includes('lastName') && document.cookie.includes('birthYear')) {
        let cookieArray = document.cookie.split("; ")
        for (let coo of cookieArray) {
            let cookieElements = coo.split('=')
            console.log(cookieElements[1])
            if (cookieElements[0] == 'firstName')
                name_input.value = cookieElements[1]

            if (cookieElements[0] == 'lastName')
                lastName_input.value = cookieElements[1]

            if (cookieElements[0] == 'birthYear')
                birthYear_input.value = cookieElements[1]

            if (cookieElements[0] == 'phoneNumber')
                phone_input.value = cookieElements[1]

            if (cookieElements[0] == 'gender')
                gender.value = cookieElements[1]

            if (cookieElements[0] == 'skype')
                skype_input.value = cookieElements[1]


        }
        save.addEventListener('click', checkUserForm)
    }
    else {
        save.addEventListener('click', checkUserForm)
    }

}

function removeCookie() {
    Cookies.remove('email', {
        path: '/'
    });
    Cookies.remove('password', {
        path: '/'
    })
    Cookies.remove('firstName', {
        path: '/'
    });
    Cookies.remove('lastName', {
        path: '/'
    })
    Cookies.remove('birthYear', {
        path: '/'
    });
    Cookies.remove('phoneNumber', {
        path: '/'
    })
    Cookies.remove('gender', {
        path: '/'
    });
    Cookies.remove('skype', {
        path: '/'
    })
}

function checkRegistrationForm() {
    let email;
    if (/^\w+([-.]\w+)*@\w+([-.]\w+)*\.\w+$/.test(mail_input.value)) {
        email = mail_input.value
        mail_error.style.display = 'none';
    } else {
        mail_error.style.display = 'block';
        return false;
    }
    let password = password_input.value
    if (password.length >= 6) {
        passwordLength_error.style.display = 'none'
        if (!/\d/.test(password)) {
            number_error.style.display = 'block'
            bigLetter_error.style.display = 'none'
            smallLetter_error.style.display = 'none'
        } else if (!/[a-z]/.test(password)) {
            number_error.style.display = 'none'
            bigLetter_error.style.display = 'none'
            smallLetter_error.style.display = 'block'
        } else if (!/[A-Z]/.test(password)) {
            number_error.style.display = 'none'
            bigLetter_error.style.display = 'block'
            smallLetter_error.style.display = 'none'
        } else {
            number_error.style.display = 'none'
            bigLetter_error.style.display = 'none'
            smallLetter_error.style.display = 'none'
            if (passRepeat_input.value == password) {
                passwordRepeat_error.style.display = 'none'
                let oneHourLifeTimeCookie = new Date(new Date().getTime() + 60 * 60 * 1000);
                Cookies.set('email', email, {
                    expires: oneHourLifeTimeCookie,
                    path: '/'
                })
                Cookies.set('password', password, {
                    expires: oneHourLifeTimeCookie,
                    path: '/'
                })
                moveToSecondPage()
            } else {
                passwordRepeat_error.style.display = 'block'
            }
        }

    } else {
        passwordLength_error.style.display = 'block'
    }
}

function checkUserForm() {
    let obligatoryFieldCounter = 0
    if (/^[A-Z][a-z]{1,20}$/.test(name_input.value)) {
        obligatoryFieldCounter++
        name_error.style.display = 'none'
    } else
        name_error.style.display = 'block'

    if (/^[A-Z][a-z]{1,20}$/.test(lastName_input.value)) {
        lastName_error.style.display = 'none'
        obligatoryFieldCounter++
    } else
        lastName_error.style.display = 'block'

    if (/^\d{4}$/.test(birthYear_input.value) && birthYear_input.value * 1 >= 1900) {
        birthYear_error.style.display = 'none'
        obligatoryFieldCounter++
    } else
        birthYear_error.style.display = 'block'

    if (/^(\s*)?([- _():=+]?\d[- _():=+]?){10,12}(\s*)?$/.test(phone_input.value)) {
        phone_error.style.display = 'none'
    } else
        phone_error.style.display = 'block'

    if (obligatoryFieldCounter >= 3) {
        let oneHourLifeTimeCookie = new Date(new Date().getTime() + 60 * 60 * 1000);
        Cookies.set('firstName', name_input.value, {
            expires: oneHourLifeTimeCookie,
            path: '/'
        });
        Cookies.set('lastName', lastName_input.value, {
            expires: oneHourLifeTimeCookie,
            path: '/'
        })
        Cookies.set('birthYear', birthYear_input.value, {
            expires: oneHourLifeTimeCookie,
            path: '/'
        })
        Cookies.set('phoneNumber', phone_input.value, {
            expires: oneHourLifeTimeCookie,
            path: '/'
        })
        Cookies.set('gender', gender.value, {
            expires: oneHourLifeTimeCookie,
            path: '/'
        })
        Cookies.set('skype', skype_input.value, {
            expires: oneHourLifeTimeCookie,
            path: '/'
        })
    } else {
        alert('Please fill in all field with "*"')
    }
}


function moveToSecondPage() {
    window.location.href = './index_page2.html';
}


