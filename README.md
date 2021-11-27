# whealth_firebase
ios 버전 세팅하는 방법

# 초반 세팅
npm install -g react-native-cli

yarn add @react-native-firebase/app
yarn add @react-native-firebase/database

rebuild the ios app (pod install)

# 구글 로그인 관련
# 파이어베이스 프로젝트에서 ios 앱 생성
1) plist 관련해서는 동일함
2) 프로젝트 Authentication에서 구글 로그인 활성화-> 웹 클라이언트 ID 따로 저장해두기 -> 프로젝트코드에 추가해야 됨.
3) yarn add @react-native-community/google-signin
4) rebuild ios app (pod install)
5) XCode에서 URL 스키마에 REVERSED_CLIENT_ID(GoogleService-Info.plist 파일 안에 있음)을 추가.
