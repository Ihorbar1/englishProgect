import React from 'react'
import Modal from 'react-modal';
import axios from "../../lib/api";
import s from './styles.module.css'

class MenuModal extends React.Component {

   deleteCategory = () => {
      let id = this.props.id;
      axios.post(`/api/delCategory.php`, { id: id })
         .then((response) => {
            this.props.closeModal();
            this.props.getCategories();
            // this.props.getWords(this.props.activeCategory);
            console.log(response.data);
         }).catch((error) => {
            console.log(error);
         })
   }

   render() {
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
               {/* <div><p>{this.props.title}</p></div> */}

               <p>Delete category "{this.props.title}" ?</p>
               <button className={s.checkDelBtn} onClick={this.deleteCategory}>delete</button>
            </Modal>


         </>)
   }
}

export default MenuModal;