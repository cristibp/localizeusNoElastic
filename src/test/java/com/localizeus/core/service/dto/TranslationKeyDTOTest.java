package com.localizeus.core.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.localizeus.core.web.rest.TestUtil;

public class TranslationKeyDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TranslationKeyDTO.class);
        TranslationKeyDTO translationKeyDTO1 = new TranslationKeyDTO();
        translationKeyDTO1.setId(1L);
        TranslationKeyDTO translationKeyDTO2 = new TranslationKeyDTO();
        assertThat(translationKeyDTO1).isNotEqualTo(translationKeyDTO2);
        translationKeyDTO2.setId(translationKeyDTO1.getId());
        assertThat(translationKeyDTO1).isEqualTo(translationKeyDTO2);
        translationKeyDTO2.setId(2L);
        assertThat(translationKeyDTO1).isNotEqualTo(translationKeyDTO2);
        translationKeyDTO1.setId(null);
        assertThat(translationKeyDTO1).isNotEqualTo(translationKeyDTO2);
    }
}
