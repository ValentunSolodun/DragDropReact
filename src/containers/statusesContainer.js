import Tables from '../components/table/table';
import { connect } from 'react-redux';
import { getStatuses  } from '../actions/table';
import { createSelector } from 'reselect';
import CardStatus from "../components/table/cardStatus";
import {history} from "../helpers/history";

let statusesSelector = createSelector(
    state => state.statuses,
    statuses => statuses
);

const mapStateToProps = state => ({
    items: statusesSelector(state),
    Container: CardStatus,
    type : 'statuses'
})

const mapDispatchToProps = dispatch => {
    dispatch(getStatuses());
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Tables)