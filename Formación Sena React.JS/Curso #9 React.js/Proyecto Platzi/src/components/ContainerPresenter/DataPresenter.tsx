import React from 'react';
type DataItem = {
  id: number;
  name: string;
  description: number;
  image: string;
}

type DataPresenterProps = {
  data: DataItem[];

}

export const DataPresenter: React.FC<DataPresenterProps> = ({ data }) => {
  return (
    <>
      {data.map((item) => (
        <React.Fragment key={item.id}>
          <h2>{item.name}</h2>
          <em>{item.description}</em>
          <img src={item.image} alt={item.name} />
        </React.Fragment>
      ))}
    </>
  );
};
