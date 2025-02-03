type ChildComponentProps = {
  render: (name: string) => JSX.Element;
}



export const ChildComponent = ({ render }: ChildComponentProps) => {
  const name = "Hosmmer"
  return (
    <>{render(name)}</>
  )
}


export const ParentComponent = () => {
  return (
    <ChildComponent render={(name) => <p>Hello , {name}!</p>} />
  );
};
