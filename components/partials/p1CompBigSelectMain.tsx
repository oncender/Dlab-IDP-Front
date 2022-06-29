import styles from "../../styles/Select.module.scss"

type Option = {
  value: string
}

export default function BigSelect(props: any) {
  return (
    !props.options? null:
    <div>
      <select className={styles.customSelect} onChange={props.handleChange}>
        {props.options.map((option: Option) => 
          <option key={option.value} value={option.value}>
            {option.value}
          </option>
        )}
      </select>
    </div>
  )
}