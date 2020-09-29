import React from 'react';
import axios from '../../lib/api'
// import ReactNotification from 'react-notifications-component'
// import 'react-notifications-component/dist/theme.css'
// import { store } from 'react-notifications-component';
// import { error } from '../../helpers/notification'
import s from './styles.module.css'
import { withRouter } from 'react-router-dom';
import { Link } from "react-router-dom";


class Login extends React.Component {
   state = {
      mail: '',
      password: '',
   }

   createUserInfo = (e) => {
      this.setState({ [e.target.name]: e.target.value })
   }

   checkState = (e) => {
      if (!(this.state.mail === '' || this.state.password === '')) {
         e.preventDefault()
         this.sendUser()

      } else {
         console.log('false');
         e.preventDefault()
      }
   }

   sendUser = () => {
      axios.post('/api/login.php', this.state)
         .then((response) => {
            if (response.data.userId) {
               // console.log(true);
               localStorage.setItem('userId', response.data.userId)
               this.props.history.push("/menu");
            } else {
               // console.log();
               console.log(response.data);
            }
         })
         .catch((error) => {
            console.log(error);
            // this.createNotification(false)
         })

   }
   // createNotification = (typeOfNotification) => {
   //    if (!typeOfNotification) {
   //       store.addNotification(
   //          {
   //             ...error,
   //             title: "Помилка",
   //             message: "Неправильний логін або пароль",
   //          })
   //    }
   // }

   render() {
      return (
         <>
            {/* <ReactNotification /> */}
            <div className={s.wrap}>

               <div className={s.login}>
                  <form action="">
                     <p>email</p>
                     <input type="text" name='mail' onBlur={(e) => this.createUserInfo(e)} />
                     <p>Password</p>
                     <input type="password" name='password' onBlur={(e) => this.createUserInfo(e)} />
                     <input type="submit" value="Вхід" onClick={(e) => this.checkState(e)} />
                  </form>
                  <Link className={s.regLink} to="/registration">Registration</Link>
               </div>
            </div>
         </>
      )
   }
}
export default withRouter(Login);