import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import NoteAppNav from "./NoteAppNav"
import NoteAppBody from "./NoteAppBody"
import Footer from "../Footer"
import { setCurrentCategoryId } from "./NoteActions"
import { getCategoriesRequest } from "../category/CategoryRequests"
import { getNotesRequest } from "./NoteRequests"

class NoteApp extends React.Component {
  constructor(props) {
    super(props);

    this.props.getCategoriesRequest();
  }

  render () {
    const current_category_id = parseInt(this.props.match.params.number, 10);
    this.props.setCurrentCategoryId(current_category_id);
    this.props.getNotesRequest(current_category_id);
    return (
      <React.Fragment>
        <NoteAppNav/>
        <NoteAppBody/>
        <Footer/>
      </React.Fragment>
    );
  }
}

// Примечание! Если добавить в structuredSelector доступ к notes,
// то получаем бесконечный цикл из-за getNotesRequest (подгружаем notes,
// далее Redux перерендеривает всё отображение, так как увидит изменение
// this.props.notes)
// Решение: либо метод getNotesRequest не добавлять в mapDispatchToProps,
// либо, как сделано сейчас, не давать доступ компонента к this.props.notes
// через connect(structuredSelector).

// A little explanation how react-redux connect works,
// 1. each time there is a modification in the store (from the reducers), the
// mapStateToProps (или structuredSelector в нашем случае) functions of all
// the connected components are executed
// 2. if the one prop in the returned object is different from the previous
// one (the operator === is used) then the component is re-rendered otherwise it
// does nothing.
const structuredSelector = createStructuredSelector({
  mode: state => state.mode
});

const mapDispatchToProps = { getCategoriesRequest, getNotesRequest, setCurrentCategoryId }; // выносим методы отдельно от компонента

export default connect(structuredSelector, mapDispatchToProps)(NoteApp);
