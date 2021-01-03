package com.localizeus.core.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.localizeus.core.web.rest.TestUtil;

public class KeyLabelDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(KeyLabelDTO.class);
        KeyLabelDTO keyLabelDTO1 = new KeyLabelDTO();
        keyLabelDTO1.setId(1L);
        KeyLabelDTO keyLabelDTO2 = new KeyLabelDTO();
        assertThat(keyLabelDTO1).isNotEqualTo(keyLabelDTO2);
        keyLabelDTO2.setId(keyLabelDTO1.getId());
        assertThat(keyLabelDTO1).isEqualTo(keyLabelDTO2);
        keyLabelDTO2.setId(2L);
        assertThat(keyLabelDTO1).isNotEqualTo(keyLabelDTO2);
        keyLabelDTO1.setId(null);
        assertThat(keyLabelDTO1).isNotEqualTo(keyLabelDTO2);
    }
}
