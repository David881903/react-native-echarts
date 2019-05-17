import React, { Component } from 'react';
import { WebView, View, StyleSheet, Platform } from 'react-native';
import renderChart from './renderChart';
import echarts from './echarts.min';

const source = Platform.OS == 'ios' ? require('./tpl.html') : { 'uri': 'file:///android_asset/echarts/tpl.html' };
export default class App extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.option !== this.props.option) {
      this.refs.chart.reload();
    }
  }

  render() {
    return (
      <View style={{ flex: 1, height: this.props.height || 400, }}>
        <WebView
          originWhitelist={['*']}//RN0.56开始，本地的html加载 添加白名单
          ref="chart"
          // scalesPageToFit={false}
          scrollEnabled={false}
          injectedJavaScript={renderChart(this.props)}
          style={{
            height: this.props.height || 400,
            backgroundColor: this.props.backgroundColor || 'transparent'
          }}
          source={source}
          onMessage={event => this.props.onPress ? this.props.onPress(JSON.parse(event.nativeEvent.data)) : null}
        />
      </View>
    );
  }
}
