import React from 'react';
import { View } from 'react-native';
import styles from '../Styles/Index'; // Importando seus estilos

const DashboardScreen = () => {
  return (
    <View style={styles.iframeContainer}>
      {/* Iframe do Power BI */}
      <iframe
        title="PowerBI Dashboard"
        src="https://app.powerbi.com/view?r=eyJrIjoiMDFmNjJmMDktOWRiZC00ZjJlLTlhMGEtMGYxNDhhY2RkNzhmIiwidCI6IjkxZjE4NWI4LWJhOGItNDcxMi04MGYwLWZkM2YzY2JlZGJhNyJ9"
        style={styles.iframe}
        allowFullScreen
      ></iframe>
    </View>
  );
};

export default DashboardScreen;
