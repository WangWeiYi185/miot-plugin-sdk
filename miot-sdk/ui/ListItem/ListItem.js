'use strict';
import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions, Image, Platform, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Images, Styles } from '../../resources';
import Separator from "../Separator";
const { width } = Dimensions.get('window');
const THIN_HEIGHT = 50;
const PADDING = 24;
const ICON_SIZE = Platform.select({ android: 26, ios: 24 }); // 当android设置24的时候，图形会挤压形成锯齿
/**
 * @export public
 * @doc_name ListItem
 * @doc_index 22
 * @author Geeook
 * @since 10004
 * @module ListItem
 * @description 普通列表项
 * @property {string} title - 左侧主标题
 * @property {string} subtitle - 右侧副标题
 * @property {string} value - 右侧文案
 * @property {function} onPress - 点击事件
 * @property {bool} disabled - 是否禁用点击，默认值 false
 * @property {bool} showSeparator - 是否显示分割线，默认值 true
 * @property {component} separator - 自定义分割线，不传将显示默认样式的分割线
 * @property {style} containerStyle - 列表项的自定义样式
 * @property {style} titleStyle - 标题的自定义样式
 * @property {style} subtitleStyle - 副标题的自定义样式
 * @property {style} valueStyle - 右侧文案的自定义样式
 */
export default class ListItem extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    value: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    showSeparator: PropTypes.bool,
    separator: PropTypes.element,
    containerStyle: PropTypes.object,
    titleStyle: PropTypes.object,
    subtitleStyle: PropTypes.object,
    valueStyle: PropTypes.object,
  }
  static defaultProps = {
    title: '',
    subtitle: '',
    value: '',
    onPress: _ => { },
    disabled: false,
    showSeparator: true,
    containerStyle: {},
    titleStyle: {},
    subtitleStyle: {},
    valueStyle: {},
  }
  constructor(props, context) {
    super(props, context);
  }
  render() {
    let extraContainerStyle = {
      height: THIN_HEIGHT,
    };
    if (this.props.subtitle) {
      extraContainerStyle = {
        paddingVertical: 8,
        height: undefined,
      }
    }
    let extraRightStyle = {
      flex: 2,
    }
    if (this.props.value) {
      extraRightStyle.flex = 4;
    }
    const valueStyle = {
      marginRight: -7,
      flex: 1,
      textAlign: 'right',
    }
    return (
      <View style={{ backgroundColor: '#fff' }}>
        <TouchableHighlight
          disabled={this.props.disabled}
          underlayColor={Styles.common.underlayColor}
          onPress={this.props.onPress}
        >
          <View style={[styles.container, this.props.containerStyle, extraContainerStyle]}>
            <View style={styles.left}>
              <Text
                numberOfLines={1}
                ellipsizeMode='tail'
                style={[Styles.common.title, this.props.titleStyle]}
              >
                {this.props.title}
              </Text>
              {this.props.subtitle ?
                <Text
                  numberOfLines={2}
                  ellipsizeMode='tail'
                  style={[Styles.common.subtitle, this.props.subtitleStyle]}
                >
                  {this.props.subtitle}
                </Text>
                : null
              }
            </View>
            <View style={{ width: 10 }} />
            <View style={[styles.right, extraRightStyle]}>
              {this.props.value ?
                <Text
                  numberOfLines={2}
                  ellipsizeMode='tail'
                  style={[Styles.common.subtitle, this.props.valueStyle, valueStyle]}
                >
                  {this.props.value}
                </Text>
                : null
              }
              <Image
                style={styles.icon}
                source={Images.common.right_arrow}
              />
            </View>
          </View>
        </TouchableHighlight>
        {this.renderSeparator()}
      </View>
    );
  }
  renderSeparator() {
    if (!this.props.showSeparator) return null;
    return this.props.separator || <Separator style={{ marginLeft: Styles.common.padding }} />
  }
}
var styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: '#fff',
    paddingHorizontal: PADDING,
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    flex: 8,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
});