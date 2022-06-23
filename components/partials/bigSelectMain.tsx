import styles from "../../styles/Select.module.css"

type Option = {
  value: string
}

export default function BigSelect(prop: any) {
  return (
    !prop.options? null:
    <div>
      <select className={styles.customSelect}>
        {prop.options.map((option: Option) => 
          <option key={option.value} value={option.value}>
            {option.value}
          </option>
        )}
      </select>
    </div>
  )
}