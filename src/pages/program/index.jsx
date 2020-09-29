import React, { Component } from 'react';
import s from './styles.module.css'
import { WordInput } from './styles'
import { Link } from "react-router-dom";


export default class extends Component {

   state = {
      words: JSON.parse(localStorage.getItem('words')),
      curentWordKey: '',
      curentWordVal: '',
      recordedWord: '',
      start: true,
      end: false,
      disabled: true,
      lose: false,
   }

   programStart = () => {
      let words = this.state.words;
      if (words[0] === undefined) { return this.setState({ end: true }) };

      let wordsLength = words.length;
      console.log(wordsLength);
      // let randomNum = Math.floor(Math.random() * (wordsLength - 1 - 0 + 1)) + 0;
      const random = Math.random();
      let randomNum = Math.floor(random * wordsLength);
      // console.log(random);
      // console.log(random * wordsLength);
      // console.log(randomNum);
      let curentObj = words[randomNum];
      let curentWordKey = Object.keys(curentObj)[0];
      this.setState({ curentWordKey, curentWordVal: curentObj[curentWordKey], start: false, disabled: true, checkValidation: null, recordedWord: '', lose: false });
      let newWords = [];
      words.map((item, i) => {
         if (Object.keys(item)[0] !== curentWordKey) {
            return newWords.push({ [Object.keys(item)[0]]: words[i][Object.keys(item)[0]] });
         }
      });

      this.setState({ words: newWords });
   }

   createRecordedWord = (event) => {
      let recordedWord = this.state.recordedWord;
      recordedWord = event.target.value;
      this.setState({ recordedWord });
   }

   checkRecordedWord = () => {
      if (this.state.curentWordKey === this.state.recordedWord) {
         this.setState({ disabled: false, checkValidation: true });
      } else {
         this.setState({ checkValidation: false });
      }
   }
   showCurenrVal = () => {
      this.setState({ lose: true });
   }

   render() {
      if (this.state.start) { this.programStart() };

      return (
         <>
            <div className={s.main}>
               <Link className={s.link} to="/menu">menu</Link>
               <div className={s.content}>
                  {this.state.end ? <h3>End program</h3> :
                     <div className={s.progr}>
                        <p className={s.word}>{this.state.curentWordVal}</p>
                        <WordInput type="text" className={s.inp} value={this.state.recordedWord} checkValidation={this.state.checkValidation} onChange={(e) => this.createRecordedWord(e)} />
                        <div className={s.chek_btn}>
                           <button className={s.chek} onClick={this.checkRecordedWord}>Перевірка</button>
                           <button className={s.next} disabled={this.state.disabled ? "disabled" : ''} onClick={this.programStart}>Наступне слово</button>
                        </div>
                        <div className={s.help}>
                           <button className={s.help} onClick={this.showCurenrVal}>Показати слово</button>
                           <p className={s.help_word} >{this.state.lose ? this.state.curentWordKey : ''}</p>
                        </div>
                     </div>}

               </div>
            </div>
         </>
      )
   }
}