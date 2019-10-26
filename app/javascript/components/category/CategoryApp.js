import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CategoryAppNav from "./CategoryAppNav"
import CategoryAppBody from "./CategoryAppBody"
import Footer from "../Footer"
import { getCategoriesSuccess } from "./CategoryActions"

// TODO:
// Сделать работающее приложение
// 1. Выбор категорий по одной или все сразу и удаление
// 2. Создание заметки
// 3. Отображение заметки
// 4. Удаление заметок
// 5. Редактирование категории
// 6. Редактирование заметки
// 7. Кнопка количества блоков на странице
// 8. Пагинация
// 9. безопасность апишки по токену

const GET_CATEGORIES_REQUEST = 'GET_CATEGORIES_REQUEST';
function loadCategories() {
  return dispatch => {
    dispatch({ type: GET_CATEGORIES_REQUEST });
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
    this.props.loadCategories();
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

const mapDispatchToProps = { loadCategories }; // выносим методы отдельно от компонента

export default connect(structuredSelector, mapDispatchToProps)(CategoryApp);
