import styles from './JournalForm.module.scss';
import Button from '../Button/Button';
import { useEffect, useReducer, useState } from 'react';
import cn from 'classname';
import { INITIAL_STATE, formReducer } from './JournalForm.state';

function JournalForm({ onSubmit }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;

  useEffect(() => {
    let timerId;
    if (
      !isValid.date ||
      !isValid.post ||
      !isValid.title
    ) {
      setTimeout(() => {
        dispatchForm({ type: 'RESET_VALIDITY' });
      }, 2000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [isValid]);

  useEffect(() => {
    if (isFormReadyToSubmit) {
      onSubmit(values);
    }
  }, [isFormReadyToSubmit]);

  const addJournalItem = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    dispatchForm({ type: 'SUBMIT', payload: formProps });
  };

  return (
    <form className={styles['journal-form']} onSubmit={addJournalItem}>
      <div>
        <input
          type='text'
          name='title'
          className={cn(styles['input-title'], {
            [styles['invalid']]: !isValid.title,
          })}
        />
      </div>
      <div className={styles['form-row']}>
        <label for='date' className={styles['form-label']}>
          <img src='/calendar.svg' alt='Иконка календаря' />
          <span>Дата</span>
        </label>
        <input
          type='date'
          name='date'
          id='date'
          className={cn(styles['input'], {
            [styles['invalid']]: !isValid.date,
          })}
        />
      </div>
      <div className={styles['form-row']}>
        <label for='tag' className={styles['form-label']}>
          <img src='/tag.svg' alt='Иконка папки' />
          <span>Дата</span>
        </label>
        <input type='text' name='tag' id='tag' className={styles['input']} />
      </div>

      <textarea
        name='post'
        id=''
        cols='30'
        rows='10'
        className={cn(styles['input'], {
          [styles['invalid']]: !isValid.post,
        })}
      ></textarea>
      <Button text='Сохранить' />
    </form>
  );
}

export default JournalForm;
