const newToList = {
  "haveReadList": {
    //if only using ISBNs, i would make this (below) an array. since i want information stored in 'local' db, making this an object with the ISBN as key.
    // "ISBNsToAddToList": {
      // "isbn13": {
      //   "author": '',
      //   "title": '',
      //   "publisher": ''
      //   // NOTE 'this entry is a dummy placeholder, the "isbn" key for this one would be replaced with the particular book"s isbn for a real book.'
      // }
      "0000000000000":{
        "author": 'Richards, Rowland',
        "title": 'Principles of solid mechanics',
        "publisher": 'CRC Press'
      }

    // }
  },
  "currentlyReadingList": {
    // "ISBNsToAddToList": {
      "0000000000000":{
        "author": 'Richards, Rowland',
        "title": 'Principles of solid mechanics',
        "publisher": 'CRC Press'
      }
    // }
  },
  "toBeReadList": {
    // "ISBNsToAddToList": {
      "0000000000000":{
        "author": 'Richards, Rowland',
        "title": 'Principles of solid mechanics',
        "publisher": 'CRC Press'
      }
    // }
  }


}
//newToList is currently a js object.



export default newToList;
