import React from 'react';
import s from './styles.module.css';
import axios from "../../lib/api";
import { withRouter } from 'react-router-dom';
import { Link } from "react-router-dom";
import NewCategoryModal from "../../components/newCategoryModal/index";
import CheckCategoryDelete from "../../components/checkCategoryDelete/index";
import NewWordsModal from "../../components/newWordsModal/index";


class Menu extends React.Component {

   state = {
      categories: [],
      words: [],
      activeCategory: null,
      newCategoryData: {},
      userId: JSON.parse(localStorage.getItem('userId')),
      newCategoryHandle: false,
      checkDeleteHandle: false,
      deleteCategoriesTitle: '',
      // deleteCategoryId: '',
      newWordsHandle: false,
   }

   getCategories = () => {
      axios.get(`/api/getCategories.php`, { params: { userId: this.state.userId } })
         .then((response) => {
            this.setState({ categories: response.data });
            console.log(response.data);
         }).catch((error) => {
            console.log(error);
         })
   }
   getWords = (id) => {
      // let testId = '1';
      this.setState({ activeCategory: id })
      axios.get(`/api/getWords.php`, { params: { categoryId: id } })
         .then((response) => {
            this.setState({ words: response.data });
            console.log(response.data);
         }).catch((error) => {
            console.log(error);
         })
   }
   postNewCategory = (e) => {
      e.preventDefault();
      axios.post(`/api/addNewCategories.php`, { id: this.state.userId, title: this.state.newCategoryData.title })
         .then((response) => {
            // this.getWords(this.state.activeCategory);
            this.getCategories();
            this.newCategoryClose();
            console.log(response.data);
         }).catch((error) => {
            console.log(error);
         })
   }


   postDelWords = (id) => {
      axios.post(`/api/delWords.php`, { id: id })
         .then((response) => {
            this.getWords(this.state.activeCategory);
            // this.setState({ words: response.data });
            console.log(response.data);
         }).catch((error) => {
            console.log(error);
         })
   }



   createNewCategoryData = (e) => {
      let newCategoryData = { ...this.state.newCategoryData, [e.target.name]: e.target.value };
      this.setState({ newCategoryData });
   }


   vueCategories = () => {
      let categories = this.state.categories.map((item) => {
         // let id = item['ID'];
         return (
            <div className={s.categoryItem}>
               <button className={s.categoryBtn} onClick={() => this.getWords(item['ID'])}>{item['title']}</button>
               <button className={s.categoryDelBtn} onClick={() => this.checkDeleteOpen(item['title'], item['ID'])}>X</button>
            </div>

         );
      })
      return categories;
   }
   vueWords = () => {
      // console.log(this.state.words);
      let words = this.state.words.map((item) => {
         return (<table className={s.wordTable}>
            <tbody>
               <tr>
                  <td>{item['EN']} - </td>
                  <td>{item['UA']}</td>
                  <button className={s.delWord} onClick={() => this.postDelWords(item['ID'])}>X</button>
               </tr>
            </tbody>
         </table>);
      })
      let wordTest = this.state.words;
      if (wordTest.length === 0) {
         words = `empty`
      }
      return words;
   }

   startProgram = () => {
      // debugger;
      const categoryWords = this.state.words;
      if (categoryWords.length !== 0) {
         // console.log(this.state.words + ' true');
         let words = categoryWords.map((item) => {
            return { [item['EN']]: item['UA'] }
         })
         localStorage.setItem('words', JSON.stringify(words));
         this.props.history.push("/program");
      } else {
         console.log('false');
      }
   }

   newCategoryOpen = () => this.setState({ newCategoryHandle: true });
   newCategoryClose = () => this.setState({ newCategoryHandle: false });

   checkDeleteOpen = (title, id) => this.setState({ checkDeleteHandle: true, deleteCategoriesTitle: title, deleteCategoryId: id });
   checkDeleteClose = () => this.setState({ checkDeleteHandle: false });

   newWordsOpen = () => this.setState({ newWordsHandle: true });
   newWordsClose = () => this.setState({ newWordsHandle: false });


   componentDidMount = () => {
      this.getCategories();
   }

   render() {
      // console.log(this.state.words);

      return (
         <>
            <h1>{this.state.testStr}</h1>
            <div className={s.conteiner}>
               <Link className={s.link} to="/">login</Link>
               <div className={s.list}>
                  {this.vueCategories()}
                  <button className={s.addCategory} onClick={this.newCategoryOpen}>add</button>
               </div>
               <div className={s.item}>
                  {!this.state.activeCategory == '' ?
                     <>
                        {this.vueWords()}
                        <button className={s.addNewWord} onClick={this.newWordsOpen}>add new word</button>
                        <button className={s.startProgram} onClick={() => this.startProgram()}>start</button>

                     </>
                     : <p>select category</p>}
               </div>

            </div>
            <NewCategoryModal showModal={this.state.newCategoryHandle} closeModal={this.newCategoryClose} createNewCategoryData={this.createNewCategoryData} postNewCategory={this.postNewCategory} />
            <CheckCategoryDelete showModal={this.state.checkDeleteHandle} closeModal={this.checkDeleteClose} title={this.state.deleteCategoriesTitle} id={this.state.deleteCategoryId} getCategories={this.getCategories} />
            <NewWordsModal showModal={this.state.newWordsHandle} closeModal={this.newWordsClose} activeCategory={this.state.activeCategory} getWords={this.getWords} />
         </>)
   }
}

export default withRouter(Menu);