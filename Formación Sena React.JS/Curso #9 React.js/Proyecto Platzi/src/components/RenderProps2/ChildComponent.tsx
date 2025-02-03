interface ChildComponentProps {
  data: string[]
}
const ChildComponent: React.FC<ChildComponentProps> = ({ data }) => {
  return (

    data.map((item: string, index: number) => (

      <li key={index}>{item}</li>
    ))
  );
};

export default ChildComponent;
