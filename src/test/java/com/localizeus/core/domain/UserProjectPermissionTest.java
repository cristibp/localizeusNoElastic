package com.localizeus.core.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.localizeus.core.web.rest.TestUtil;

public class UserProjectPermissionTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserProjectPermission.class);
        UserProjectPermission userProjectPermission1 = new UserProjectPermission();
        userProjectPermission1.setId(1L);
        UserProjectPermission userProjectPermission2 = new UserProjectPermission();
        userProjectPermission2.setId(userProjectPermission1.getId());
        assertThat(userProjectPermission1).isEqualTo(userProjectPermission2);
        userProjectPermission2.setId(2L);
        assertThat(userProjectPermission1).isNotEqualTo(userProjectPermission2);
        userProjectPermission1.setId(null);
        assertThat(userProjectPermission1).isNotEqualTo(userProjectPermission2);
    }
}
