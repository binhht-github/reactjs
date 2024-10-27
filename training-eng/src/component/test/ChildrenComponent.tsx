import React, { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const ChildrenComponent: React.FC<Props> = ({ children }) => {
    return <div className="children-container">{children}</div>;
};

export default ChildrenComponent;
