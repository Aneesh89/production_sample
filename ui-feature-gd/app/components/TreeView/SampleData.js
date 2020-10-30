import React from 'react';

const maxDepth = 5;

const renderDepthTitle = ({ path }) => `Depth: ${path.length}`;


const treeData = [
    {
        title:  (<div style={{ fontSize: '14px' }}>Home</div>),
        expanded: true,
        children: [             
            {
                title: (<div style={{ fontSize: '12px' }}>Dashboard</div>),
            },           
        ],
    },
    {
        expanded: true,
        title: (<div style={{ fontSize: '14px' }}>User Management</div>),
        children: [
            {
                title: (<div style={{ fontSize: '12px' }}>Manage User</div>),
            },
        ],
    },
    {
        expanded: true,
        title: (<div style={{ fontSize: '14px' }}>Menu Management</div>),    
        children: [
            {
                title: (<div style={{ fontSize: '12px' }}>Manage Menu</div>),
            },
        ],
    },
    {
        expanded: true,
        title: (<div style={{ fontSize: '14px' }}>First Information Report</div>),   
        children: [
            {
                title: (<div style={{ fontSize: '12px' }}>Add FIR</div>),
            },
            {
                title: (<div style={{ fontSize: '12px' }}>Search and View</div>),
            },
            {
                title: (<div style={{ fontSize: '12px' }}>Transfer an FIR</div>),
            },
        ],
    },
    {
        title: (<div style={{ fontSize: '14px' }}>General Diary</div>), 
        children: [
            {
                title: (<div style={{ fontSize: '12px' }}>Add GD</div>),
            },          
        ],
    },
];

const treeData1 = [
    {
        title: '`title`',
        subtitle: '`subtitle`',
        expanded: true,
        children: [
            {
                title: 'Child Node',
                subtitle: 'Defined in `children` array belonging to parent',
            },
            {
                title: 'Nested structure is rendered virtually',
                subtitle: (
                    <span>
            The tree uses&nbsp;
                        <a href="https://github.com/bvaughn/react-virtualized">
              react-virtualized
            </a>
                        &nbsp;and the relationship lines are more of a visual trick.
          </span>
                ),
            },
        ],
    },
    {
        expanded: true,
        title: 'Any node can be the parent or child of any other node',
        children: [
            {
                expanded: true,
                title: 'Chicken',
                children: [{ title: 'Egg' }],
            },
        ],
    },
    {
        title: 'Button(s) can be added to the node',
        subtitle:
            'Node info is passed when generating so you can use it in your onClick handler',
    },
    {
        title: 'Show node children by setting `expanded`',
        subtitle: ({ node }) => `expanded: ${node.expanded ? 'true' : 'false'}`,
        children: [
            {
                title: 'Bruce',
                subtitle: ({ node }) => `expanded: ${node.expanded ? 'true' : 'false'}`,
                children: [{ title: 'Bruce Jr.' }, { title: 'Brucette' }],
            },
        ],
    },
    {
        title: 'Advanced',
        subtitle: 'Settings, behavior, etc.',
        children: [
            {
                title: (
                    <div>
                        <div
                            style={{
                                backgroundColor: 'gray',
                                display: 'inline-block',
                                borderRadius: 10,
                                color: '#FFF',
                                padding: '0 5px',
                            }}
                        >
                            Any Component
                        </div>
                        &nbsp;can be used for `title`
                    </div>
                ),
            },
            {
                expanded: true,
                title: 'Limit nesting with `maxDepth`',
                subtitle: `It's set to ${maxDepth} for this example`,
                children: [
                    {
                        expanded: true,
                        title: renderDepthTitle,
                        children: [
                            {
                                expanded: true,
                                title: renderDepthTitle,
                                children: [
                                    { title: renderDepthTitle },
                                    {
                                        title: ({ path }) =>
                                            path.length >= maxDepth
                                                ? 'This cannot be dragged deeper'
                                                : 'This can be dragged deeper',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                title: 'Disable dragging on a per-node basis with the `canDrag` prop',
                subtitle: 'Or set it to false to disable all dragging.',
                noDragging: true,
            },
            {
                title: 'You cannot give this children',
                subtitle:
                    'Dropping is prevented via the `canDrop` API using `nextParent`',
                noChildren: true,
            },
            {
                title:
                'When node contents are really long, it will cause a horizontal scrollbar' +
                ' to appear. Deeply nested elements will also trigger the scrollbar.',
            },
        ],
    },
];

export default treeData;