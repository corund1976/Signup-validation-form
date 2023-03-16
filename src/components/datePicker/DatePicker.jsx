import { useEffect, useRef, useState } from 'react';

import { DateRange } from 'react-date-range';
import { ru } from 'react-date-range/dist/locale'; // localization

import Select from 'ui/select';
import Input from 'ui/input';

import unixToDateConvert from 'utils/unixToDateConvert';

import s from './datePicker.module.css';
import useOutsideClick from 'hooks/useOutsideClick';

const options = [
  { '.....': '3650' },
  { Сегодня: '0' },
  { Неделя: '7' },
  { Месяц: '30' },
  { '3 месяца': '91' },
  { Полгода: '183' },
  { Год: '365' },
];

function DatePicker() {
  const startInit = null;
  const endInit = null;

  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [state, setState] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection',
    },
  ]);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  console.log('***************');
  console.log('START STATE ===', state[0].startDate);
  console.log('END STATE ===', state[0].endDate);
  console.log('START ===', start);
  console.log('END ===', end);

  // Даты, видимые пользователю
  const [periodUI, setPeriodUI] = useState('');
  // Длина периода в пресетах селекта
  const [select, setSelect] = useState('');

  const openCalendar = () => setIsCalendarVisible(true);
  const closeCalendar = () => setIsCalendarVisible(false);

  // Обновление начального диапазона на календаре в соответствии с доступным периодом действия сигнала
  useEffect(() => {
    if (startInit && endInit)
      setState(() => [
        {
          startDate: startInit,
          endDate: endInit,
          key: 'selection',
        },
      ]);
  }, [startInit, endInit]);

  // Изменение периода в соответствии с текущим выбором в календаре
  useEffect(() => {
    if (state[0].startDate && state[0].endDate) {
      const startCalendar = new Date(state[0].startDate);
      const yearStart = startCalendar.getFullYear();
      const monthStart = startCalendar.getMonth();
      const dateStart = startCalendar.getDate();
      const timeZoneStart = startCalendar.getTimezoneOffset() / 60;
      const newStart = new Date(Date.UTC(yearStart, monthStart, dateStart, timeZoneStart, 0, 0));
      setStart(newStart);

      const endCalendar = new Date(state[0].endDate);
      const yearEnd = endCalendar.getFullYear();
      const monthEnd = endCalendar.getMonth();
      const dateEnd = endCalendar.getDate();
      const timeZoneEnd = endCalendar.getTimezoneOffset() / 60;
      const newEnd = new Date(Date.UTC(yearEnd, monthEnd, dateEnd, 23 + timeZoneEnd, 59, 59));
      setEnd(newEnd);
    }
  }, [state]);

  // Обновление видимых ПОЛЬЗОВАТЕЛЮ дат
  useEffect(() => {
    setPeriodUI(`${unixToDateConvert(start)}  -  ${unixToDateConvert(end)}`);
  }, [start, end]);

  // Изменение периода в соответствии с Пресетом в Селекте
  useEffect(() => {
    const endPreset = new Date();
    endPreset.setUTCHours(23);
    endPreset.setMinutes(59);
    endPreset.setSeconds(59);
    // setEnd(endPreset);

    const startPreset = new Date(endPreset - select * 24 * 60 * 60 * 1000);
    startPreset.setUTCHours(0);
    startPreset.setMinutes(0);
    startPreset.setSeconds(0);
    // setStart(startPreset);

    closeCalendar();
  }, [select]);

  const datePickerRef = useRef(null);
  // Закрытие при клике мимо DatePicker
  useOutsideClick(datePickerRef, closeCalendar, isCalendarVisible);

  return (
    <div className={s.container} ref={datePickerRef}>
      {/* S E L E C T - I N P U T */}
      <div className={s.select__period}>
        <Input id="period" label="Выбрать период" value={periodUI} onClick={openCalendar} readOnly />
      </div>

      {isCalendarVisible && (
        <div className={s.date__picker}>
          {/* S E L E C T */}
          <div className={s.select__preset}>
            <Select id="preset" label="Выбрать период" value={select} onChange={setSelect} options={options} />
          </div>

          {/* T A B S */}
          <ul className={s.tabs}>
            <li>
              <button className={select === '0' ? s.tab__active : s.tab} type="button" onClick={() => setSelect('0')}>
                Сегодня
              </button>
            </li>
            <li>
              <button className={select === '7' ? s.tab__active : s.tab} type="button" onClick={() => setSelect('7')}>
                Неделя
              </button>
            </li>
            <li>
              <button className={select === '30' ? s.tab__active : s.tab} type="button" onClick={() => setSelect('30')}>
                Месяц
              </button>
            </li>
            <li>
              <button className={select === '91' ? s.tab__active : s.tab} type="button" onClick={() => setSelect('91')}>
                3&nbsp;месяца
              </button>
            </li>
            <li>
              <button
                className={select === '183' ? s.tab__active : s.tab}
                type="button"
                onClick={() => setSelect('183')}
              >
                Полгода
              </button>
            </li>
            <li>
              <button
                className={select === '365' ? s.tab__active : s.tab}
                type="button"
                onClick={() => setSelect('365')}
              >
                Год
              </button>
            </li>
          </ul>

          {/* C A L E N D A R */}
          <DateRange
            ranges={state}
            onChange={(item) => setState([item.selection])}
            minDate={startInit}
            maxDate={endInit}
            months={2}
            direction="horizontal"
            onRangeFocusChange={closeCalendar}
            showDateDisplay={false}
            showMonthAndYearPickers={false}
            moveRangeOnFirstSelection={false}
            weekdayDisplayFormat="EEEEEE"
            locale={ru}
          />
        </div>
      )}
    </div>
  );
}

export default DatePicker;
