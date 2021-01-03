package com.localizeus.core.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.localizeus.core.web.rest.TestUtil;

public class UserPermissionDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserPermissionDTO.class);
        UserPermissionDTO userPermissionDTO1 = new UserPermissionDTO();
        userPermissionDTO1.setId(1L);
        UserPermissionDTO userPermissionDTO2 = new UserPermissionDTO();
        assertThat(userPermissionDTO1).isNotEqualTo(userPermissionDTO2);
        userPermissionDTO2.setId(userPermissionDTO1.getId());
        assertThat(userPermissionDTO1).isEqualTo(userPermissionDTO2);
        userPermissionDTO2.setId(2L);
        assertThat(userPermissionDTO1).isNotEqualTo(userPermissionDTO2);
        userPermissionDTO1.setId(null);
        assertThat(userPermissionDTO1).isNotEqualTo(userPermissionDTO2);
    }
}
