package com.localizeus.core.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.localizeus.core.web.rest.TestUtil;

public class DiscussionTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Discussion.class);
        Discussion discussion1 = new Discussion();
        discussion1.setId(1L);
        Discussion discussion2 = new Discussion();
        discussion2.setId(discussion1.getId());
        assertThat(discussion1).isEqualTo(discussion2);
        discussion2.setId(2L);
        assertThat(discussion1).isNotEqualTo(discussion2);
        discussion1.setId(null);
        assertThat(discussion1).isNotEqualTo(discussion2);
    }
}
