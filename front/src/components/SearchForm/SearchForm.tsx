import { Form } from 'react-bootstrap';
import { useEffect, useMemo, useState } from 'react';
import { AppRoute, ParamNames } from '../../constant.ts';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store/store.ts';
import { useDispatch } from 'react-redux';

function SearchForm() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const { searchFullTextParams: searchFullTextParamsMemo } = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const searchFullTextParams = params.get(ParamNames.SearchFullText);

    return { searchFullTextParams };
  }, [location]);

  useEffect(() => {
    if (searchFullTextParamsMemo !== null) {
      setSearch(searchFullTextParamsMemo);
    }
  }, [searchFullTextParamsMemo]);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams();
    if (search) {
      urlSearchParams.append(ParamNames.SearchFullText, search);
    } else {
      urlSearchParams.delete(ParamNames.SearchFullText);
    }
    navigate({
      pathname: AppRoute.Main,
      search: urlSearchParams.toString(),
    });
  }, [dispatch, navigate, search]);

  const onSetSearch = (searchValue: string) => {
    setSearch(searchValue);
  };

  return (
    <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
      <Form.Control
        name='search-input'
        type='text'
        placeholder='Search...'
        value={search}
        onChange={(evt) => onSetSearch(evt.target.value)}
      />
    </Form.Group>
  );
}

export default SearchForm;
