import {
  key,
  proxy
} from '../config';
import axios from "axios";

export default class Search {
  constructor(query) {
    this.query = query;
  }
  async getResults() {
    const key = 'b748d90404dd61ba205ae975ee7a2d66'
    try {
      const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`)
      this.result = res.data.recipes;
      // console.log(this.result)
    } catch (err) {
      alert(err)
    }
  }
}