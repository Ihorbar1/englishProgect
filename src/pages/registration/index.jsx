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
      name: '',
      password: '',
   }

   createUserInfo = (e) => {
      this.setState({ [e.target.name]: e.target.value })
   }

   checkState = (e) => {
      if (!(this.state.login === '' || this.state.name === '' || this.state.password === '')) {
         e.preventDefault()
         this.sendUser()

      } else {
         console.log('false');
         e.preventDefault()
      }
   }

   sendUser = () => {
      axios.post('/api/createUser.php', this.state)
         .then((response) => {
            console.log(response.data);
            // localStorage.setItem('role', response.data.data.role)
            // this.props.history.push("/");
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
            {/* <div>1232</div> */}
            {/* <ReactNotification /> */}
            <div className={s.wrap}>

               <div className={s.login}>
                  <form action="">
                     <p>email</p>
                     <input type="text" name='mail' onBlur={(e) => this.createUserInfo(e)} />
                     <p>name</p>
                     <input type="text" name='name' onBlur={(e) => this.createUserInfo(e)} />
                     <p>Password</p>
                     <input type="password" name='password' onBlur={(e) => this.createUserInfo(e)} />
                     <input type="submit" value="Registraton" onClick={(e) => this.checkState(e)} />
                  </form>
                  <Link className={s.logLink} to="/">login</Link>
               </div>
            </div>
         </>
      )
   }
}
export default withRouter(Login);