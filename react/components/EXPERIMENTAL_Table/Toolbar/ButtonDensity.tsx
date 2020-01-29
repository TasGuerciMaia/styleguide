import React, { FC } from 'react'

import IconDensity from '../../icon/Density/index.js'
import { NAMESPACES } from '../constants'
import Button, { IconSize } from './Button'
import usePopoverMenu, { Box, Item, Alignment } from './PopoverMenu'
import useTableMeasures, {
  Density,
  DENSITY_OPTIONS,
} from '../hooks/useTableMeasures'

const FIELDS_ITEM_HEIGHT = 36
const BOX_HEIGHT = DENSITY_OPTIONS.length * FIELDS_ITEM_HEIGHT

const ButtonDensity: FC<ButtonDensityProps> = ({
  label,
  handleCallback,
  disabled,
  alignMenu,
  density,
  ...options
}) => {
  const { currentDensity, setCurrentDensity } = density
  const { buttonRef, toggleBox, setBoxVisible, boxVisible } = usePopoverMenu()
  return (
    <Button
      id={NAMESPACES.TOOLBAR.BUTTON_DENSITY}
      title={label}
      ref={buttonRef}
      onClick={toggleBox}
      icon={<IconDensity size={IconSize.Medium} />}
      disabled={disabled}>
      {boxVisible && (
        <Box height={BOX_HEIGHT} alignMenu={alignMenu}>
          {DENSITY_OPTIONS.map((key: Density, index) => {
            const isKeySelected = currentDensity === key
            return (
              <Item
                key={index}
                isSelected={isKeySelected}
                onClick={() => {
                  setCurrentDensity(key)
                  setBoxVisible(false)
                  handleCallback && handleCallback(key)
                }}>
                {options[`${key}Label`]}
              </Item>
            )
          })}
        </Box>
      )}
    </Button>
  )
}

export type ButtonDensityProps = {
  density: ReturnType<typeof useTableMeasures>
  label: string
  compactLabel: string
  regularLabel: string
  comfortableLabel: string
  handleCallback: Function
  alignMenu: Alignment
  disabled: boolean
}

export default ButtonDensity
