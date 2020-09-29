import React from 'react'
import Modal from 'react-modal';
import s from './styles.module.css'

class MenuModal extends React.Component {

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

               <form className={s.newCategoryForm} method="post">
                  <p>New category name</p>
                  <input className={s.newCategoryinput} type="text" name="title" onBlur={(e) => this.props.createNewCategoryData(e)} />
                  <button onClick={this.props.postNewCategory}>add</button>
               </form>


            </Modal>


         </>)
   }
}

export default MenuModal;