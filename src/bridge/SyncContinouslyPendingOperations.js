// @flow
// Sync continuously the accounts that have pending operations

import React, { Component } from "react";
import { createStructuredSelector, createSelector } from "reselect";
import { connect } from "react-redux";
import type { Account } from "@ledgerhq/live-common/lib/types";
import { BridgeSyncConsumer } from "./BridgeSyncContext";
import type { Sync } from "./BridgeSyncContext";
import { accountsSelector } from "../reducers/accounts";

const accountsWithPendingOperationsSelector = createSelector(
  accountsSelector,
  accounts => accounts.filter(a => a.pendingOperations.length > 0),
);

class SyncContPendingOpsConnected extends Component<{
  sync: Sync,
  accounts: Account[],
  priority: number,
  interval: number,
}> {
  componentDidMount() {
    this.timeout = setTimeout(this.check, this.props.interval);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  check = () => {
    const { sync, accounts, priority, interval } = this.props;
    setTimeout(this.check, interval);
    if (accounts.length > 0) {
      sync({
        type: "SYNC_SOME_ACCOUNTS",
        accountIds: accounts.map(a => a.id),
        priority,
      });
    }
  };

  timeout: *;

  render() {
    return null;
  }
}

const Effect = connect(
  createStructuredSelector({
    accounts: accountsWithPendingOperationsSelector,
  }),
)(SyncContPendingOpsConnected);

const SyncContinuouslyPendingOperations = ({
  priority,
  interval,
}: {
  priority: number,
  interval: number,
}) => (
  <BridgeSyncConsumer>
    {sync => <Effect sync={sync} interval={interval} priority={priority} />}
  </BridgeSyncConsumer>
);

export default SyncContinuouslyPendingOperations;
