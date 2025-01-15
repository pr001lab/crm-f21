import { CatalogListProps } from './CatalogList.props.ts';
import { IClientProps } from '../../types/client.ts';
import CatalogItem from '../CatalogItem/CatalogItem.tsx';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { ChevronDown, ChevronUp } from 'react-feather';
import { SortEnum } from '../../constant.ts';

function CatalogList({ clients }: CatalogListProps) {
  const [sortedClients, setSortedClients] = useState(clients);

  const setSortType = (sortType: SortEnum) => {
    const nextSortedClients = [...sortedClients].sort((a, b) => {
      if (sortType === SortEnum.Ascending) {
        return a.name.localeCompare(b.name);
      }
      return b.name.localeCompare(a.name);
    });
    setSortedClients(nextSortedClients);
  };

  return (
    <>
      <thead>
        <tr>
          <th>#</th>
          <th>
            name
            <Button
              variant='link'
              className='px-1 py-0'
              onClick={() => setSortType(SortEnum.Ascending)}
            >
              <ChevronDown color='#212529' />
            </Button>
            <Button
              variant='link'
              className='px-1 py-0'
              onClick={() => setSortType(SortEnum.Descending)}
            >
              <ChevronUp color='#212529' />
            </Button>
          </th>
          <th>company</th>
          <th>email</th>
          <th>action</th>
        </tr>
      </thead>
      <tbody>
        {sortedClients.map((client: IClientProps, idx: number) => (
          <CatalogItem key={client.documentId} {...client} num={idx + 1} />
        ))}
      </tbody>
    </>
  );
}

export default CatalogList;
