import React,{Component} from 'react';
import PropTypes from 'prop-types'; 
import TreeNode from 'com/cmb/lp/react/js/ui/export/component/tree/treeNode.jsx';
import 'com/cmb/lp/react/resource/css/tree.less';
// <Tree root={data} //根节点数据
//       clickNode = {this.clickNode} 
//       path={this.rootPath} //需要当前路径的需要加上
//       getAllCheckedNode={getAllCheckedNode}//得到所有选中的节点
//       hasCheck=true,//是否加选中框
//       style:{},//自定义样式/>

class Tree extends Component{
  constructor(props){
    super(props);
    this.checkNodeIDs = new Set();
    this.nodeDetail = {};
    this.state={
      children:[]
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.isExpand && nextProps.children){
      this.setState({
        children:nextProps.children//默认将根节点的子元素展示
      })
    }   
  }
  static defaultProps={
    path:'/',
    children:[],
    hasCheck:false,//默认没有复选框
    style:{},
  }
  static propTypes = {
    path:PropTypes.string,//根节点路径
    children:PropTypes.array,//根节点数据
    hasCheck:PropTypes.boolean,//是否有复选框
    style:PropTypes.object,//样式，加上树组件的最外层元素ul上
    clickNode:PropTypes.func,//点击节点时的回调函数
    saveAllCheckedNode:PropTypes.func,//点击复选框时的回调函数
  }
  //点击节点时的回调函数
  clickNode =(node,path,callback)=>{
    // if(node.children){//同步数据，有children
    //   callback(node.children);
    // }
      this.props.clickNode({node,path},callback);
  }
  //保存当前选中的节点
  saveAllCheckedNode = (node,checked)=>{
    const id = node.id;
    if(checked){//选中
      this.checkNodeIDs.add(id);
      this.nodeDetail[id] = node;
    }else{//没选中，如果之前保存了，删除
      if(this.checkNodeIDs.has(id)){
        this.checkNodeIDs.delete(id);
      }
    }
    const checkNodeIDs = [...this.checkNodeIDs];
    const allChecked = checkNodeIDs.map(id=>this.nodeDetail[id])
    this.props.getAllCheckedNode(allChecked)
  }
  render(){
    const {
      path,
      root,
      style,
      hasCheck,
    } = this.props;
    return (
        <ul className="tree-ul" style={style}>
        {
          root.map(item=>{
            return (
              <TreeNode key={item.id} 
              node={item} 
              clickNode={this.clickNode}
              path={path} 
              hasCheck={hasCheck}          
              saveAllCheckedNode = {this.saveAllCheckedNode}
              children={this.state.children}/>
            )
          })
        }
        </ul>
    )
  }
}
export default Tree;
