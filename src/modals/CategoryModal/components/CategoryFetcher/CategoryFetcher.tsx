import React, { FC, useEffect, useState } from 'react';
import { Category } from '../../../../types';
import { Loader } from '../../../../components/Loader';
import i18n from 'i18n-js';
import { ErrorMessage } from '../../../../components/ErrorMessage';
import { useEditCategory, useGetCategory } from '../../../../hooks/categories';
import { CategoryModalContent } from '../CategoryModalContent';

interface ContentProps {
  category: Category;
}

export const Content: FC<ContentProps> = ({ category }) => {
  const [title, setTitle] = useState(category.title);
  const [description, setDescription] = useState(category.description);
  const [color, setColor] = useState(category.color);
  const editCategory = useEditCategory();

  useEffect(() => {
    editCategory({
      id: category.id,
      title,
      description,
      color,
    });
  }, [title, description, color]);

  return (
    <CategoryModalContent
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      color={color}
      setColor={setColor}
    />
  );
};

interface CategoryFetcherProps {
  id: number;
}

export const CategoryFetcher: FC<CategoryFetcherProps> = ({ id }) => {
  const { data, isLoading, error } = useGetCategory(id);

  if (isLoading) {
    return <Loader />;
  }

  if (error || !data) {
    return <ErrorMessage>{error || i18n.t('common.state.error')}</ErrorMessage>;
  }

  return <Content category={data} />;
};
