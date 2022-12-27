import React from 'react';
import { useNavigate, Navigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

import axios from '../axios';
import { selectIsAuth } from '../redux/slices/Auth';

import styles from '../components/scss/CreateBlog.module.scss';

const CreateBlog = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const isAuth = useSelector(selectIsAuth);

  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = React.useState('');
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');

  const [isLoading, setIsLoading] = React.useState(false);

  const inputFileRef = React.useRef(null);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url);
    } catch (error) {
      console.warn(error);
      alert('Ошибка при загрузке файла');
    }
  };

  const removeImage = () => {
    window.confirm('Удалить картинку?', setImageUrl(''));
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: true,
      maxHeight: '400px',
      autofocus: true,
      placeholder: '*Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  const onSubmitPost = async () => {
    try {
      setIsLoading(true);

      const fields = {
        title,
        imageUrl,
        tags,
        text,
      };

      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post('/posts', fields);
      const _id = isEditing ? id : data._id;

      navigate(`/FullPost/${_id}`);
    } catch (error) {
      console.warn(error);
      alert(
        'Что-то пошло не так, не удалось создать пост. Проверьте корректность заполнения полей',
      );
    }
  };

  React.useEffect(() => {
    if (id) {
      axios
        .get(`/posts/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setText(data.text);
          setImageUrl(data.imageUrl);
          setTags(data.tags.join(','));
        })
        .catch((err) => {
          console.warn(err);
          alert('Что-то пошло не так, не удалось отредактировать пост');
        });
    }
  }, []);

  if (!window.localStorage.getItem('token') && !isAuth) {
    <Navigate to="/" />;
  }

  return (
    <div className={styles.root}>
      <input type="file" ref={inputFileRef} onChange={handleChangeFile} hidden />
      <button onClick={() => inputFileRef.current.click()} className={styles.previewBtn}>
        Загрузить превью
      </button>

      {imageUrl && (
        <div className={styles.removeBlock}>
          <button onClick={removeImage}>Удалить картинку</button>
          <img
            className={styles.uploadImage}
            src={imageUrl ? `http://localhost:4444${imageUrl}` : ''}
            alt="imageUrl"
          />
        </div>
      )}
      <input
        className={styles.title}
        type="text"
        placeholder="*Заголовок статьи..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className={styles.tags}
        type="text"
        placeholder="*Тэги..."
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div>
        <button className={styles.shareBtn} onClick={onSubmitPost}>
          {isEditing ? 'Сохранить' : 'Опубликовать'}
        </button>
        <Link to="/">
          <button className={styles.cancelBtn}>Отмена</button>
        </Link>
      </div>
    </div>
  );
};

export default CreateBlog;
