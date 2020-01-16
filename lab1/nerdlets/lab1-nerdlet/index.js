import React from 'react';
import { TableChart, Stack, StackItem, ChartGroup, LineChart, ScatterChart } from 'nr1';

// https://docs.newrelic.com/docs/new-relic-programmable-platform-introduction

export default class Lab1NerdletNerdlet extends React.Component {
    constructor(props) {
        super(props);
        this.accountId = 630060;
        this.state = {
            appId: null,
            appName: null
        };
        console.debug("Nerdlet constructor", this); //eslint-disable-line
    }

    setApplication(inAppId, inAppName) {
        this.setState({ appId: inAppId, appName: inAppName })
    }

    render() {
        const { appId, appName } = this.state;
        const nrql = `SELECT count(*) as 'transactions', apdex(duration) as 'apdex', percentile(duration, 99, 90, 70) FROM Transaction facet appName, appId limit 25`;
        const tCountNrql = `SELECT count(*) FROM Transaction WHERE appId = ${appId} TIMESERIES`;
        const apdexNrql = `SELECT apdex(duration) FROM Transaction WHERE appId = ${appId} TIMESERIES`
        //return the JSX we're rendering
        return (
            <ChartGroup>
                <Stack
                    verticalType={Stack.VERTICAL_TYPE.FILL}
                    directionType={Stack.DIRECTION_TYPE.VERTICAL}
                    gapType={Stack.GAP_TYPE.EXTRA_LOOSE}>
                    <StackItem>
                            <TableChart query={nrql} accountId={this.accountId} className="chart" onClickTable={(dataEl, row, chart) => {
                                //for learning purposes, we'll write to the console.
                                console.debug([dataEl, row, chart]) //eslint-disable-line
                                this.setApplication(row.appId, row.appName)
                            }}/>
                    </StackItem>
                    {appId && <StackItem>
                        <Stack
                            horizontalType={Stack.HORIZONTAL_TYPE.FILL}
                            directionType={Stack.DIRECTION_TYPE.HORIZONTAL}
                            gapType={Stack.GAP_TYPE.EXTRA_LOOSE}>
                            <StackItem>
                                <LineChart accountId={this.accountId} query={tCountNrql} className="chart"/>
                            </StackItem>
                            <StackItem>
                                <ScatterChart accountId={this.accountId} query={apdexNrql} className="chart"/>
                            </StackItem>
                        </Stack>
                    </StackItem>}
                </Stack>
            </ChartGroup>
        )
    }
}
