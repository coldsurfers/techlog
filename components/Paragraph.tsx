import { Text } from '@coldsurfers/hotsurf'
import { PropsWithChildren } from 'react'
import { StyleProp, TextStyle } from 'react-native'

const Paragraph = ({
  children,
  style,
  ...otherProps
}: PropsWithChildren<{
  style?: StyleProp<TextStyle>
}>) => {
  const baseStyles: StyleProp<TextStyle> = {
    fontFamily: 'Noto Sans KR',
  }
  return (
    <Text style={[baseStyles, style]} {...otherProps}>
      {children}
    </Text>
  )
}

export default Paragraph
