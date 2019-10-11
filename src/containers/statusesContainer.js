import Tables from '../components/table/table';
import {connect} from 'react-redux';
import {getStatuses} from '../actions/table';
import {createSelector} from 'reselect';
import CardStatus from "../components/table/cardStatus";


let statusesSelector = createSelector(
  state => state.statuses,
  statuses => statuses
);

const mapStateToProps = (state, args) => ({
  items: statusesSelector(state),
  Container: CardStatus,
  type: 'statuses',
  project_id: args.match.params.id
})

const mapDispatchToProps = (dispatch, args) => {
  dispatch(getStatuses(args.match.params.id));
  dispatch({type: "CHANGED_PATH_TASKS", payload: {id_1: args.match.params.id}})
  return {};
}


export default connect(mapStateToProps, mapDispatchToProps)(Tables);