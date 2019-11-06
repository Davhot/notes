import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CategoryAppNav from "./CategoryAppNav"
import CategoryAppBody from "./CategoryAppBody"
import Footer from "../Footer"
import { getCategoriesSuccess } from "./CategoryActions"

// TODO:
// Сделать работающее приложение
// 1. Создание заметки
// 2. Отображение заметки
// 3. Удаление заметок
// 4. Редактирование категории
// 5. Редактирование заметки
// 6. Кнопка количества блоков на странице
// 7. Пагинация
// 8. безопасность апишки по токену

function getCategoriesRequest() {
  return dispatch => {
    return fetch('api/v1/categories', {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer' // no-referrer, *client
    }).then(response => response.json())
      .then(json => dispatch(getCategoriesSuccess(json.data)))
      .catch(error => console.log(error));
  }
};

class CategoryApp extends React.Component {
  render () {
    this.props.getCategoriesRequest();
    const { mode } = this.props;
    return (
      <React.Fragment>
        <CategoryAppNav/>
        <CategoryAppBody/>
        <Footer/>
      </React.Fragment>
    );
  }
}

const structuredSelector = createStructuredSelector({
  mode: state => state.mode
});

const mapDispatchToProps = { getCategoriesRequest }; // выносим методы отдельно от компонента

export default connect(structuredSelector, mapDispatchToProps)(CategoryApp);
