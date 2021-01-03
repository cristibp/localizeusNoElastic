package com.localizeus.core.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.localizeus.core.web.rest.TestUtil;

public class TranslationDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TranslationDTO.class);
        TranslationDTO translationDTO1 = new TranslationDTO();
        translationDTO1.setId(1L);
        TranslationDTO translationDTO2 = new TranslationDTO();
        assertThat(translationDTO1).isNotEqualTo(translationDTO2);
        translationDTO2.setId(translationDTO1.getId());
        assertThat(translationDTO1).isEqualTo(translationDTO2);
        translationDTO2.setId(2L);
        assertThat(translationDTO1).isNotEqualTo(translationDTO2);
        translationDTO1.setId(null);
        assertThat(translationDTO1).isNotEqualTo(translationDTO2);
    }
}
