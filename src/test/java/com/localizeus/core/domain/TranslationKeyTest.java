package com.localizeus.core.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.localizeus.core.web.rest.TestUtil;

public class TranslationKeyTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TranslationKey.class);
        TranslationKey translationKey1 = new TranslationKey();
        translationKey1.setId(1L);
        TranslationKey translationKey2 = new TranslationKey();
        translationKey2.setId(translationKey1.getId());
        assertThat(translationKey1).isEqualTo(translationKey2);
        translationKey2.setId(2L);
        assertThat(translationKey1).isNotEqualTo(translationKey2);
        translationKey1.setId(null);
        assertThat(translationKey1).isNotEqualTo(translationKey2);
    }
}
