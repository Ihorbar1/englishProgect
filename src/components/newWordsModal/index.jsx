import React from 'react'
import Modal from 'react-modal';
import axios from "../../lib/api";
import s from './styles.module.css'

class MenuModal extends React.Component {
   state = {
      newWordData: {},
   }


   createNewWordData = (e) => {
      let newWordData = { ...this.state.newWordData, [e.target.name]: e.target.value };
      this.setState({ newWordData });
   }
   postNewWords = (e) => {
      e.preventDefault();
      let newWordData = { categoryId: this.props.activeCategory, enWord: this.state.newWordData.enWord, uaWord: this.state.newWordData.uaWord };
      // console.log(newWordData);
      axios.post(`/api/addNewWords.php`, newWordData)
         .then((response) => {
            this.props.closeModal();
            this.props.getWords(this.props.activeCategory);
            console.log(response.data);
         }).catch((error) => {
            console.log(error);
         })
   }



   render() {
      // console.log(this.props.categoryId);
      return (
         <>
            <Modal
               className={s.modal}
               isOpen={this.props.showModal}
               contentLabel="Minimal Modal Example"
               onRequestClose={this.props.closeModal}
            >
               {Modal.setAppElement('#root')}
               <button onClick={this.props.closeModal} className={s.modalButton} >X</button>
               {/* <p>some text</p> */}


               <form method="post" className={s.newWordForm}>
                  <p>First word</p>
                  <input className={s.newWordinput} type="text" name="enWord" onBlur={(e) => this.createNewWordData(e)} />
                  <p>Second word</p>
                  <input className={s.newWordinput} type="text" name="uaWord" onBlur={(e) => this.createNewWordData(e)} />
                  <button onClick={(e) => this.postNewWords(e)}>send</button>
               </form>


            </Modal>


         </>)
   }
}

export default MenuModal;