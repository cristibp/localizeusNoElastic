package com.localizeus.core.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.localizeus.core.web.rest.TestUtil;

public class TranslationTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Translation.class);
        Translation translation1 = new Translation();
        translation1.setId(1L);
        Translation translation2 = new Translation();
        translation2.setId(translation1.getId());
        assertThat(translation1).isEqualTo(translation2);
        translation2.setId(2L);
        assertThat(translation1).isNotEqualTo(translation2);
        translation1.setId(null);
        assertThat(translation1).isNotEqualTo(translation2);
    }
}
