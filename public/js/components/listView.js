import React from 'react';
import { render } from 'react-dom';

import SingleBook from './singleBook';

export default class ListView extends React.Component {


  render(){

    // console.log(this.props, 'this.props in components/listView.js');
    let key = this.props.listKey;
    // listKey is this.props.selectedListKey in components which actively choose a list, and is just a string with the appropriate key name in the "static" page lists
    //that is probably bad practice, but i don't think i can use "key" as a prop name, and it is descriptively super accurate being the key for the list, or the selected list key depending on an selection or static page.

    // console.log(key,'key in components/listView.js');

    let listTitle= this.props.listCollection[key] ? this.props.listCollection[key].title : undefined;

    // console.log(listTitle,'listTitle in componenets/listView');
    // console.log(`${listTitle} THIS IS listTitle WITH THE $ NOTATION`);

    let listShow = this.props.listCollection[key] ? this.props.listCollection[key].list : "no key, therefore no list"

    let listShowKeys = listShow ? Object.keys(listShow) : "no listShow yet, therefore no listShowKeys";

    let listLength = listShowKeys.length;

    let listDisplay = [];

    if(listTitle){
      for(let i = 0; i < listLength; i++){
        let thisBook = listShow[listShowKeys[i]]
        let stamp = new Date().getTime();
        let uniqueStamp = `${i}${stamp}`;
        listDisplay.push(
          <SingleBook
            key = {uniqueStamp}
            id = {uniqueStamp}
            title={thisBook.title}
            author={thisBook.author}
            genre={thisBook.genre}
            />
        )

      }
      console.log(listDisplay, 'listDisplay after loop');
    }

    // let containerId = `${id}Container`

    //there should only ever be 1 of this element on a page, so should not need a key tag

    return(
      <div id="listViewContainer">
        {listDisplay}
      </div>

    )
  }
}