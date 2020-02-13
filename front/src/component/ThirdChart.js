import React, { Component } from 'react';
import '../App.css';
import '../../node_modules/react-vis/dist/style.css';
import {Sunburst} from 'react-vis';

class ThirdChart extends Component {
    render() {
        const data = {
            "title": "analytics",
            "color": "#12939A",
            "children": [
             {
              "title": "cluster",
              "children": [
               {"title": "AgglomerativeCluster", "color": "#12939A", "size": 3938},
               {"title": "CommunityStructure", "color": "#12939A", "size": 3812},
               {"title": "HierarchicalCluster", "color": "#12939A", "size": 6714},
               {"title": "MergeEdge", "color": "#12939A", "size": 743}
              ]
             },
             {
              "title": "graph",
              "children": [
               {"title": "BetweennessCentrality", "color": "#12939A", "size": 3534},
               {"title": "LinkDistance", "color": "#12939A", "size": 5731},
               {"title": "MaxFlowMinCut", "color": "#12939A", "size": 7840},
               {"title": "ShortestPaths", "color": "#12939A", "size": 5914},
               {"title": "SpanningTree", "color": "#12939A", "size": 3416}
              ]
             },
             {
              "title": "optimization",
              "children": [
               {"title": "AspectRatioBanker", "color": "#12939A", "size": 7074}
              ]
             }
            ]
           }
        return (
          <div className="App">
            <Sunburst
                hideRootNode
                colorType="literal"
                data={data}
                height={300}
                width={350}/>
          </div>
        );
      }
}

export default ThirdChart;