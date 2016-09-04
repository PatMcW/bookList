import React from 'react';
import { render } from 'react-dom';
import $ from 'jquery';

import Results from './results';

const rp = require('request-promise');

export default class SearchFor extends React.Component {
  searchTermChanged(updateSearchTerm,e){
    // console.log('search term was changed');
    // console.log(e, 'was e');
    // console.log(e.target, 'was e.target');
    // console.log(e.target.value, 'was e.target.value');
    let searchTermField = e.target.value;
    e.preventDefault();
    updateSearchTerm(searchTermField);

  }
  searchTypeChanged(updateSearchType,e){
    // console.log('searchTypeChanged called');
    e.preventDefault();
    // console.log(e, 'was e');
    // console.log(e.target, 'was e.target');
    // console.log(e.target.value, 'was e.target.value');
    let searchTypeSelected = e.target.value;
    //update via store/state here
    updateSearchType(searchTypeSelected)

    // console.log($('#searchTextInput'));
  }
  // textChange(e){
  //   console.log(e, 'was e');
  //   console.log(e.target, 'was e.target');
  //   console.log(e.target.value, 'was e.target.value');
  //   this.setState({value: e.target.value}) //this updates the field but shoots error:
  //   // Uncaught TypeError: Cannot read property 'setState' of undefined
  //   // probably because this isn't it's own component and/or because bypassing store interaction?
  //
  // }
  searchClicked(props, e){
    e.preventDefault();
    // console.log(this.props, 'this.props in searchClicked() in components/searchFor'); //as expected, this returns null since "this.props" hasn't been passed in as a param
    console.log(props, 'props in searchClicked() in components/searchFor');
    let apiKey = '0SBOHNU4'; //this switch in naming convention is going to fuck you.
    // let apiKey = process.env.API_KEY; //this switch in naming convention is going to fuck you.
    let searchType = props.selectedSearchType[0].toLowerCase();
    let searchTerm = props.searchTerm[0];
    let options = {
      uri: `http://isbndb.com/api/v2/json/${apiKey}/${searchType}`,
      qs: {
        'q': `${searchTerm}`
        //if this were a well constructed API, the following note would apply.
        //searchType will probably be 'searchType' instead of whatever value assigned above? ==> USE BRACKET NOTATION. (this is correct now, theoretically)
      },//this seems like a badly contructed API as far as interacting with a qs object? but maybe i'm too green to see why it's not bad.
      headers: {
        'User-Agent': 'Request-Promise'
      },
      json: true
    }

    //need to see if i can add in a .something so that if a search fails (author?q=scalzi) it tries a more general search, i.e. authorS?q=scalzi
    rp(options)
      .then( (res) => {
        console.log(res,'was res in components/searchFor.js');
        //this seems to be working? it was not working, then it was. will try again tomorrow to see if it works after ISBNdb db has presumably ticked over for the day and reset anything that expires at midnight
        console.log(options, 'was options in .then in componenets/searchFor.js ');
        props.receiveResults(res);
      })
      .catch( (err) => {
        console.log(err, 'was err in components/searchFor.js');//my impression is this will usually be a low-info response. may be confusing this err with CORS errors.
        console.log(options, 'was options in .catch in componenets/searchFor.js');
      })
      //NOTE
      //i think i then need to generate a results window. presumably done through putting the appropriate res info into the store, then letting the display update based on the store change.
      //NOTE the above note is correct. will need a "searchResults" object in the store. parsing it could be tricky since there will be a variety of potential returns. will probably need switch/case statements to parse "neatly".
  }
  render(){
    // http://isbndb.com/api/v2/json/[your-api-key]/book/9780849303159
    //returns
// {
//    "index_searched" : "isbn",
//    "data" : [
//       {
//          "author_data" : [
//             {
//                "name" : "Richards, Rowland",
//                "id" : "richards_rowland"
//             }
//          ]
//          "awards_text" : "",
//          "marc_enc_level" : "4",
//          "subject_ids" : [
//             "mechanics_applied"
//          ],
//          "summary" : "",
//          "isbn13" : "9780849303159",
//          ...,
//          "book_id" : "principles_of_solid_mechanics", //this is the id referred to in author search results as res.data.book_ids[#] //kind of dumb to not use the isbn13 there instead?
//          ...
//       }
//    ]
// }
// SHOULD be res.data.isbn13 to get the isbn, here "9780849303159"
    let searchTypeLength = this.props.searchType.length;

    let selectOptions = [];
    //use foreach instead?
    for (let i=0; i < searchTypeLength; i++ ) {
      let stamp = new Date().getTime();
      let uniqueStamp = `${i}${stamp}`;
      let isSelected = "false";
      if (this.props.searchType[i]===this.props.selectedSearchType) {
        isSelected = "true";
      }//there is probably a more elegant way to write this

      selectOptions.push(
        <option
          key = {uniqueStamp}
          id = {uniqueStamp}
          value={this.props.searchType[i]}
          >
          {this.props.searchType[i]}
        </option>
      )
    }
    // console.log(selectOptions, 'selectOption in componenets/searchFor.js');
    // <option value="Author">Author</option>
    // <option value="Authors">Authors  (plural)</option>
    // <option value="Title">Title</option>
    // <option value="ISBN">ISBN</option>
    let defValue = this.props.selectedSearchType[0]; //needed to refer to [0] to get rid of "scalar value" warning, since i had been passing the array and not the string


    // console.log(this.props.selectedSearchType, 'was this.props.selectedSearchType in components/searchFor');
    // console.log(defValue, 'was defValue in same');
    // console.log(this.props, 'was this.props in components/searchFor');

    // select value below spawns warning.js:44 Warning: The `value` prop supplied to <select> must be a scalar value if `multiple` is false. Check the render method of `SearchFor`
    let event = window.event; //needed for firefox
    return(
      <div id="searchContainer">
        <p>Add to list</p>
        <form>
          <label>Search By:
            <select

              onChange={this.searchTypeChanged.bind(event, this.props.updateSearchType)}
              value={defValue}
              >
              <option value={undefined}>Select</option>
              {selectOptions}


            </select>

          </label>
          <input id="searchTextInput"
            type="text"
            value={this.props.searchTerm}
            placeholder="update via store"
            onChange={this.searchTermChanged.bind(event, this.props.updateSearchTerm)}

            />
          <input type="submit"
            value="Search"
            onClick={this.searchClicked.bind(event, this.props)}/>
        </form>


        <Results
          searchResults={this.props.searchResults}
          />
      </div>
    )
  }
}
