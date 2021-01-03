package com.localizeus.core.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.localizeus.core.web.rest.TestUtil;

public class KeyLabelTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(KeyLabel.class);
        KeyLabel keyLabel1 = new KeyLabel();
        keyLabel1.setId(1L);
        KeyLabel keyLabel2 = new KeyLabel();
        keyLabel2.setId(keyLabel1.getId());
        assertThat(keyLabel1).isEqualTo(keyLabel2);
        keyLabel2.setId(2L);
        assertThat(keyLabel1).isNotEqualTo(keyLabel2);
        keyLabel1.setId(null);
        assertThat(keyLabel1).isNotEqualTo(keyLabel2);
    }
}
